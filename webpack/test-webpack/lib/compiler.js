let path = require('path');
let fs = require('fs');
fs.writeFileSync('.1.js', '11')
let babylon = require('babylon');
let t = require('@babel/types');
// es6 模块 exports.default
let traverse = require('@babel/traverse').default;
let generator = require('@babel/generator').default;
let ejs = require('ejs');
let { SyncHook } = require('tapable');
class Compiler {
    constructor(config) {
        this.config = config;
        // 执行命令的绝对路径
        this.root = process.cwd();
        //   入口文件
        this.entry = config.entry;
        // 入口id
        this.entryId;
        this.modules = {};

        this.hooks = {
            entryOption: new SyncHook(),
            run: new SyncHook(),
            compile: new SyncHook(),
            afterCompile: new SyncHook(),
            afterPlugins: new SyncHook(),
            emit: new SyncHook(),
            done: new SyncHook(),
        }
        if (Array.isArray(config.plugins)) {
            config.plugins.forEach(p => {
                p.apply(this)
            })
        }
        this.hooks.afterPlugins.call()
    }
    getSource(modulePath) {
        let content = fs.readFileSync(modulePath, 'utf8');
        let rules = this.config.module.rules;
        for (let i = 0; i < rules.length; i++) {
            let rule = rules[i];
            let { test, use } = rule;
            let len = use.length - 1;
            if (test.test(modulePath)) {
                function normalLoader() {
                    let loader = require(use[len--]);
                    content = loader(content);
                    if (len >= 0) {
                        normalLoader() //递归loader
                    }
                }
                normalLoader()
            }
        }
        return content;
    }
    buildModule(modulePath, isEntry) {
            let source = this.getSource(modulePath);
            let moduleId = './' + path.relative(this.root, modulePath);
            if (isEntry) {
                this.entryId = moduleId
            }
            let { sourceCode, dependencies } = this.parse(source, path.dirname(moduleId));
            this.modules[moduleId] = sourceCode;
            dependencies.forEach(d => {
                this.buildModule(path.resolve(this.root, d), false)
            })
        }
        // ast 语法解析
    parse(source, parentPath) {
        let ast = babylon.parse(source);
        let dependencies = [];
        traverse(ast, {
            CallExpression(p) {
                let node = p.node;
                if (node.callee.name == 'require') {
                    node.callee.name = '__webpack_require__';
                    let moduleName = node.arguments[0].value;
                    moduleName = path.extname(moduleName) ? moduleName : moduleName + '.js'
                    moduleName = './' + path.join(parentPath, moduleName);
                    node.arguments = [t.stringLiteral(moduleName)];
                    dependencies.push(moduleName)
                }
            }
        })
        let sourceCode = generator(ast).code;
        return { sourceCode, dependencies };
    }
    emitFile() {
        let templateStr = this.getSource(path.resolve(__dirname, 'template.ejs'));
        let str = ejs.render(templateStr, { modules: this.modules, entryId: this.entryId });
        let main = path.join(this.config.output.path, this.config.output.filename);
        fs.writeFileSync(main, str)
    }
    run() {
        this.hooks.run.call();
        this.hooks.compile.call();
        this.buildModule(path.resolve(this.root, this.entry), true);
        this.hooks.afterCompile.call();
        this.emitFile()
        this.hooks.emit.call();
        this.hooks.done.call();
    }
}

module.exports = Compiler;