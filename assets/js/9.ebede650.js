(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{242:function(n,e,t){"use strict";var a=t(91);t.n(a).a},243:function(n,e,t){"use strict";t.r(e);var a=t(235),s=t.n(a),o=(t(237),t(238),t(241),{components:{CodeMirror:s.a},props:["value","cssClass","language"],data:function(){return{frozenValue:null}},computed:{codeMirrorOptions:function(){return{mode:r[this.language],theme:"base16-dark",lineWrapping:!0}}},methods:{onCodeChanged:function(n){this.$emit("input",n)}}}),r={handlebars:{name:"handlebars"},json:{name:"javascript"},javascript:{name:"javascript"},html:{name:"xml",html:!0}},i=o,l=(t(242),t(0)),c=Object(l.a)(i,function(){var n=this.$createElement,e=this._self._c||n;return e("ClientOnly",[e("div",{class:this.cssClass},[e("code-mirror",{attrs:{value:this.value,options:this.codeMirrorOptions},on:{change:this.onCodeChanged}})],1)])},[],!1,null,null,null);e.default=c.exports},91:function(n,e,t){}}]);