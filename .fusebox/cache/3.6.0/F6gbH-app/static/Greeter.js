module.exports = { contents: "\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Greeter = (function () {\n    function Greeter(greeting) {\n        this.greeting = greeting;\n    }\n    Greeter.prototype.greet = function () {\n        return \"<h1>\" + this.greeting + \"</h1>\";\n    };\n    return Greeter;\n}());\nexports.default = Greeter;\n;\n//# sourceMappingURL=app.js.map?tm=1542367524726",
dependencies: [],
sourceMap: "{\"version\":3,\"file\":\"Greeter.js\",\"sourceRoot\":\"\",\"sources\":[\"/src/Greeter.ts\"],\"names\":[],\"mappings\":\";;AAAA;IACC,iBAAmB,QAAgB;QAAhB,aAAQ,GAAR,QAAQ,CAAQ;IAAI,CAAC;IACxC,uBAAK,GAAL;QACC,OAAO,MAAM,GAAG,IAAI,CAAC,QAAQ,GAAG,OAAO,CAAC;IACzC,CAAC;IACF,cAAC;AAAD,CAAC,AALD,IAKC;;AAAA,CAAC\",\"sourcesContent\":[\"export default class Greeter {\\n\\tconstructor(public greeting: string) { }\\n\\tgreet() {\\n\\t\\treturn \\\"<h1>\\\" + this.greeting + \\\"</h1>\\\";\\n\\t}\\n};\\n\"]}",
headerContent: undefined,
mtime: 1542365615009,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
