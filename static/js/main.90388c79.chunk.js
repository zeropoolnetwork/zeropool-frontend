(this.webpackJsonpzeropool=this.webpackJsonpzeropool||[]).push([[0],{211:function(e,t,a){e.exports=a.p+"static/media/guy-fawkes-thanks.0609f8d3.png"},213:function(e,t,a){e.exports=a.p+"static/media/logo.38e575e9.svg"},224:function(e,t,a){e.exports=a(378)},235:function(e,t,a){},242:function(e,t){},244:function(e,t){},253:function(e,t){},255:function(e,t){},282:function(e,t){},284:function(e,t){},285:function(e,t){},290:function(e,t){},292:function(e,t){},298:function(e,t){},300:function(e,t){},319:function(e,t){},331:function(e,t){},334:function(e,t){},365:function(e,t,a){},366:function(e,t,a){},367:function(e,t,a){},368:function(e,t,a){},369:function(e,t,a){},371:function(e,t,a){},372:function(e,t,a){},373:function(e,t,a){},374:function(e,t,a){},375:function(e,t,a){},376:function(e,t,a){},377:function(e,t,a){},378:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(23),c=a.n(o),s=a(32),i=a(204),l=a(413),u=a(66),d=a(102);a(235),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var m,f=a(205),p=a.n(f),b=a(41),E=a(201),g=a(414),h=a(417),O=a(110),j=a(34),v=a(18),w=a(29),S={stepBack:Object(w.createAction)("@register/stepBack")(),startRegisterAccount:Object(w.createAction)("@register/startRegisterAccount")(),generateSeed:Object(w.createAction)("@register/generateSeed")(),submitSeed:Object(w.createAction)("@register/submitSeed")(),confirmSeed:Object(w.createAction)("@register/confirmSeed")(),finishRegister:Object(w.createAction)("@register/register")(),startImportAccount:Object(w.createAction)("@register/startImportAccount")(),finishImportAccount:Object(w.createAction)("@register/importAccount")()};!function(e){e[e.STEP1=1]="STEP1",e[e.STEP2=2]="STEP2",e[e.STEP3=3]="STEP3",e[e.STEP4=4]="STEP4",e[e.IMPORT=5]="IMPORT"}(m||(m={}));var y,P=a(87).randomBytes,k=a(337).Mnemonic,N={stage:void 0,seed:[],seedConfirmed:!1,showSteps:!1},C=Object(w.createReducer)(N).handleAction(S.stepBack,(function(e){return Object(v.a)(Object(v.a)({},e),function(e){return e.stage===m.IMPORT?{stage:void 0,showSteps:!1,seed:[]}:{stage:e.stage===m.STEP1?void 0:Number(e.stage)-1,showSteps:![1,void 0].includes(e.stage),seed:e.stage===m.STEP2?[]:e.seed}}(e))})).handleAction(S.startRegisterAccount,(function(e){return Object(v.a)(Object(v.a)({},e),{},{showSteps:!0,stage:m.STEP1})})).handleAction(S.generateSeed,(function(e){return Object(v.a)(Object(v.a)({},e),{},{seed:k.generate(P(32)).words.reduce((function(e,t){return e.length<12&&!e.includes(t)&&e.push(t),e}),[]),seedConfirmed:!1,stage:m.STEP2})})).handleAction(S.submitSeed,(function(e){return Object(v.a)(Object(v.a)({},e),{},{seedConfirmed:!1,stage:m.STEP3})})).handleAction(S.confirmSeed,(function(e){return Object(v.a)(Object(v.a)({},e),{},{seedConfirmed:!0,stage:m.STEP4})})).handleAction(S.finishRegister,(function(e,t){return Object(v.a)(Object(v.a)({},e),{},{showSteps:!1,stage:void 0})})).handleAction(S.startImportAccount,(function(e){return Object(v.a)(Object(v.a)({},e),{},{hideSteps:!0,stage:m.IMPORT})})),A=a(422),B=a(403),T=a(206),x=a(402),I=function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];var n=1===t.length,r=n?t[0]:t;return Object(T.a)(Object(x.a)(Object(w.isActionOf)(r)))},R=Object(h.a)((function(e,t){return e.pipe(I(S.finishImportAccount),Object(A.a)((function(e){console.log(e)})),Object(B.a)())}),(function(e,t){return e.pipe(I(S.finishRegister),Object(A.a)((function(e){console.log(e)})),Object(B.a)())})),D={0:function(e){var t=Object(v.a)({},e);return Object(v.a)({},t)}},M=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||j.d,F=Object(g.a)(),V=Object(h.a)(R),W=Object(b.a)(),L={key:"root",version:0,storage:p.a,migrate:Object(O.a)(D,{debug:!1}),whitelist:["registerPage"]},z=Object(O.b)(L,(y=W,Object(j.c)({register:C,router:Object(u.b)(y)}))),Z=Object(j.e)(z,M(Object(j.a)(F,Object(E.a)(W)))),_=Object(O.c)(Z);F.run(V);var G=a(12),H=a(27),U=(a(365),function(e){return function(){for(var t=arguments.length,a=new Array(t),n=0;n<t;n++)a[n]=arguments[n];return a.reduce((function(e,t){return"".concat(e,"-").concat(t)}),e)}}),q=a(406),J=(a(366),a(17)),$=a(16),X=a(404),Y=(a(367),a(368),Object(G.cn)("SeedTag")),K=U("SeedTag"),Q=function(e){var t=e.text,a=e.number,n=e.hidden,o=e.hideNumber,c=e.onClick;return r.a.createElement("div",{className:Y({Placeholder:n}),"data-testid":K(),onClick:function(){return c&&!n?c(a):null}},n||o?null:r.a.createElement("div",{className:Y("Number")},a+1),r.a.createElement("div",{className:Y("Text")},n?t.split("").sort((function(){return.5-Math.random()})).join(""):t))},ee=Object(G.cn)("SeedPanel"),te=U("SeedPanel"),ae=function(e){var t=e.seed,a=e.check,o=e.onCheck,c=Object(n.useState)([]),s=Object($.a)(c,2),i=s[0],l=s[1],u=Object(n.useState)(!1),d=Object($.a)(u,2),m=d[0],f=d[1],p=Object(n.useState)([]),b=Object($.a)(p,2),E=b[0],g=b[1];Object(n.useEffect)((function(){!E.length&&a&&g(Object(J.a)(t).sort((function(){return.5-Math.random()})))}),[E.length,a,t]),Object(n.useEffect)((function(){var e=JSON.stringify(t)===JSON.stringify(i);f(e),o&&o(e)}),[m,i,t,o]);var h=function(e){i.splice(e,1),l(Object(J.a)(i)),f(!1)},O=function(e){l([].concat(Object(J.a)(i),[t[e]]))};return r.a.createElement(X.a,{className:ee(),"data-testid":te()},r.a.createElement("div",{className:ee("Body"),"data-testid":te("Body")},a?i.map((function(e,t){return r.a.createElement(Q,{text:e,number:t,key:t,onClick:h})})):t.map((function(e,t){return r.a.createElement(Q,{text:e,number:t,key:t})}))),r.a.createElement("div",{className:ee("Footer"),"data-testid":te("Footer")},a?E.map((function(e,a){return r.a.createElement(Q,{text:e,number:t.findIndex((function(t){return t===e})),hidden:i.includes(e),hideNumber:!0,key:t.findIndex((function(t){return t===e})),onClick:O})})):null,i.length!==t.length||m?null:r.a.createElement("div",{className:ee("Warning"),"data-testid":te("Warning")},"The phrases do not match!")))},ne=Object(G.cn)("StepOne"),re=U("StepOne"),oe=function(e){var t=e.onGenerate;return r.a.createElement("div",{className:ne(),"data-testid":re()},r.a.createElement("section",null,r.a.createElement(ae,{seed:[]}),r.a.createElement("p",null,"Your secret phrase consists of 12 words. Store it carefully. If you loose it, you will loose access to all of your associated wallets!")),r.a.createElement(q.a,{color:"primary",className:ne("Button"),"data-testid":re("GenerateButton"),disableElevation:!0,onClick:t,variant:"contained"},"Generate a secret phrase"))},ce=(a(369),Object(G.cn)("StepTwo")),se=U("StepTwo"),ie=function(e){var t=e.seed,a=e.onSubmit;return r.a.createElement("div",{className:ce(),"data-testid":"StepTwo"},r.a.createElement("section",null,r.a.createElement(ae,{seed:t}),r.a.createElement("p",null,"By submiting, you confirm that you have stored the secret phrase on paper or using another safe method.")),r.a.createElement(q.a,{color:"primary",className:ce("Button"),"data-testid":se("SubmitButton"),disableElevation:!0,onClick:a,variant:"contained"},"Submit"))},le=a(109),ue=(a(371),a(418)),de=a(419),me=a(416),fe=a(420),pe=a(407),be=a(411),Ee=a(408),ge=a(409),he=a(410),Oe=Object(G.cn)("StepFour"),je=U("StepFour"),ve={required:"Required",pattern:{value:/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/,message:"Use letters and numbers"},minLength:{value:8,message:"Use at least 8 characters"}},we=function(e){var t=e.onRegister,a=Object(le.a)({criteriaMode:"all"}),o=a.handleSubmit,c=a.register,s=a.reset,i=a.control,l=a.errors,u=Object(n.useState)(!1),d=Object($.a)(u,2),m=d[0],f=d[1],p=Object(n.useState)(""),b=Object($.a)(p,2),E=b[0],g=b[1],h=Object(n.useState)(""),O=Object($.a)(h,2),j=O[0],v=O[1];return r.a.createElement("div",{className:Oe(),"data-testid":je()},!1,r.a.createElement("section",null,r.a.createElement("form",{onSubmit:o(t),className:Oe("Form")},r.a.createElement(ue.a,{className:Oe("FormControl"),error:!!l.password},r.a.createElement(de.a,{htmlFor:"password"},"Password"),r.a.createElement(me.a,{id:"password",className:Oe("Password"),inputProps:{"data-testid":je("Password")},inputRef:c(ve),name:"password",onChange:function(){return g(i.getValues().password)},type:m?"text":"password",endAdornment:r.a.createElement(fe.a,{position:"end"},E?r.a.createElement(pe.a,{"aria-label":"empty password",onClick:function(){s({password:void 0,confirm:i.getValues().confirm}),g("")},onMouseDown:function(e){return e.preventDefault()}},r.a.createElement(Ee.a,null)):null,r.a.createElement(pe.a,{"aria-label":"toggle visibility",onClick:function(){return f(!m)},onMouseDown:function(e){return e.preventDefault()}},m?r.a.createElement(ge.a,null):r.a.createElement(he.a,null)))}),l.password?r.a.createElement(be.a,{"data-testid":je("PasswordError")},l.password.message):null),r.a.createElement(ue.a,{className:Oe("FormControl"),error:!!l.confirm},r.a.createElement(de.a,{htmlFor:"confirm"},"Confirm password"),r.a.createElement(me.a,{id:"confirm",className:Oe("Password"),inputProps:{"data-testid":je("Confirm")},inputRef:c({validate:function(e){return e===i.getValues().password}}),name:"confirm",onChange:function(){return v(i.getValues().confirm)},type:m?"text":"password",endAdornment:r.a.createElement(fe.a,{position:"end"},j?r.a.createElement(pe.a,{"aria-label":"empty confirmation",onClick:function(){s({password:i.getValues().password,confirm:void 0}),v("")},onMouseDown:function(e){return e.preventDefault()}},r.a.createElement(Ee.a,null)):null,r.a.createElement(pe.a,{"aria-label":"toggle visibility",onClick:function(){return f(!m)},onMouseDown:function(e){return e.preventDefault()}},m?r.a.createElement(ge.a,null):r.a.createElement(he.a,null)))}),l.confirm?r.a.createElement(be.a,{"data-testid":je("PasswordConfirmError")},"Passwords do not match"):null),r.a.createElement("p",null,"Finally, please choose a password to be used to export your account secret in the future."),r.a.createElement("p",null,r.a.createElement(q.a,{color:"primary",className:Oe("Button"),"data-testid":je("Submit"),disableElevation:!0,variant:"contained",type:"submit"},"Register")))))},Se=(a(372),a(211)),ye=a.n(Se),Pe=Object(G.cn)("Welcome"),ke=U("Welcome"),Ne=function(e){var t=e.onCreate,a=e.onImport,r=e.onAbout;return n.createElement("div",{className:Pe(),"data-testid":ke()},n.createElement("section",null,n.createElement("img",{src:ye.a,className:Pe("Logo"),"data-testid":ke("Logo"),alt:"logo"}),n.createElement("h1",{className:Pe("Greeting"),"data-testid":ke("Greeting")},"Welcome to ZeroPool"),n.createElement("p",{className:Pe("Description"),"data-testid":ke("Description")},"Please create an account or import an existing one using a secret phrase")),n.createElement(q.a,{color:"primary",className:Pe("Button"),"data-testid":ke("CreateButton"),disableElevation:!0,onClick:t,variant:"contained"},"Create new account"),n.createElement(q.a,{variant:"outlined",color:"primary",className:Pe("Button"),"data-testid":ke("ImportButton"),onClick:a},"Import existed"),n.createElement(q.a,{variant:"outlined",color:"primary",className:Pe("Button"),"data-testid":ke("AboutButton"),onClick:r},"About zeropool"))},Ce=(a(373),Object(G.cn)("StepThree")),Ae=U("StepThree"),Be=function(e){var t=e.seed,a=e.onConfirm,o=Object(n.useState)(!0),c=Object($.a)(o,2),s=c[0],i=c[1];return r.a.createElement("div",{className:Ce(),"data-testid":Ae()},r.a.createElement("section",null,r.a.createElement(ae,{seed:t,check:!0,onCheck:function(e){return i(!e)}}),r.a.createElement("p",null,"Please confirm your secret phrase. We want to be sure that you saved it correctly.")),r.a.createElement(q.a,{color:"primary",className:Ce("Button",{Disabled:s}),"data-testid":Ae("ConfirmButton"),disabled:s,disableElevation:!0,onClick:a,variant:"contained"},"Confirm"))},Te=a(412),xe=a(415),Ie=a(421),Re=(a(374),Object(G.cn)("StepHeader")),De=U("StepHeader"),Me=function(e){var t=e.step,a=e.total,n=e.onBack;return r.a.createElement("div",{className:Re(),"data-testid":De()},r.a.createElement(xe.a,{title:"Step back",placement:"top-end"},r.a.createElement(q.a,{className:Re("Button"),"data-testid":De("BackButton"),onClick:n,disableRipple:!0},r.a.createElement(Te.a,{className:Re("Icon")}))),r.a.createElement("p",{className:Re("Text"),"data-testid":De("Text")},"Step ",t," of ",a),r.a.createElement(Ie.a,{className:Re("Progress"),variant:"progress",steps:a+1,position:"static",activeStep:t-1,backButton:r.a.createElement("span",{className:"hidden"},"back"),nextButton:r.a.createElement("span",{className:"hidden"},"next")}))},Fe=(a(375),Object(G.cn)("ImportAccount")),Ve=U("ImportAccount"),We={required:"Required",pattern:{value:/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/,message:"Use letters and numbers"},minLength:{value:8,message:"Use at least 8 characters"}},Le=function(e){var t,a=e.onBack,o=e.onImport,c=Object(le.a)({criteriaMode:"all"}),s=c.handleSubmit,i=c.register,l=c.reset,u=c.control,d=c.errors,m=Object(n.useState)([]),f=Object($.a)(m,2),p=f[0],b=f[1],E=Object(n.useState)(!1),g=Object($.a)(E,2),h=g[0],O=g[1],j=Object(n.useState)(""),w=Object($.a)(j,2),S=w[0],y=w[1],P=Object(n.useState)(""),k=Object($.a)(P,2),N=k[0],C=k[1];return r.a.createElement("div",{className:Fe(),"data-testid":Ve()},!1,r.a.createElement("section",null,r.a.createElement(ae,{seed:p}),r.a.createElement("form",{onSubmit:s((function(e){return o(Object(v.a)(Object(v.a)({},e),{},{seed:p}))})),className:Fe("Form")},r.a.createElement(ue.a,{className:Fe("FormControl"),error:!!d.seed},r.a.createElement(de.a,{htmlFor:"seed"},"Secret phrase"),r.a.createElement(me.a,{id:"seed",className:Fe("Seed"),inputProps:{"data-testid":Ve("Seed")},inputRef:i(),name:"seed",onChange:function(){return b(u.getValues().seed.split(/[ ,.]+/).filter((function(e){return!!e})))},type:"text",endAdornment:r.a.createElement(fe.a,{position:"end"},p.length?r.a.createElement(pe.a,{"aria-label":"empty seed",onClick:function(){l({seed:void 0,password:u.getValues().password,confirm:u.getValues().confirm}),b([])},onMouseDown:function(e){return e.preventDefault()}},r.a.createElement(Ee.a,null)):null)}),d.password?r.a.createElement(be.a,{"data-testid":Ve("SeedError")},null===(t=d.seed)||void 0===t?void 0:t.message):null),r.a.createElement(ue.a,{className:Fe("FormControl"),error:!!d.password},r.a.createElement(de.a,{htmlFor:"password"},"Password"),r.a.createElement(me.a,{id:"password",className:Fe("Password"),inputProps:{"data-testid":Ve("Password")},inputRef:i(We),name:"password",onChange:function(){return y(u.getValues().password)},type:h?"text":"password",endAdornment:r.a.createElement(fe.a,{position:"end"},S?r.a.createElement(pe.a,{"aria-label":"empty password",onClick:function(){l({seed:u.getValues().seed,password:void 0,confirm:u.getValues().confirm}),y("")},onMouseDown:function(e){return e.preventDefault()}},r.a.createElement(Ee.a,null)):null,r.a.createElement(pe.a,{"aria-label":"toggle visibility",onClick:function(){return O(!h)},onMouseDown:function(e){return e.preventDefault()}},h?r.a.createElement(ge.a,null):r.a.createElement(he.a,null)))}),d.password?r.a.createElement(be.a,{"data-testid":Ve("PasswordError")},d.password.message):null),r.a.createElement(ue.a,{className:Fe("FormControl"),error:!!d.confirm},r.a.createElement(de.a,{htmlFor:"confirm"},"Confirm password"),r.a.createElement(me.a,{id:"confirm",className:Fe("Password"),inputProps:{"data-testid":Ve("Confirm")},inputRef:i({validate:function(e){return e===u.getValues().password}}),name:"confirm",onChange:function(){return C(u.getValues().confirm)},type:h?"text":"password",endAdornment:r.a.createElement(fe.a,{position:"end"},N?r.a.createElement(pe.a,{"aria-label":"empty confirmation",onClick:function(){l({seed:u.getValues().seed,password:u.getValues().password,confirm:void 0}),C("")},onMouseDown:function(e){return e.preventDefault()}},r.a.createElement(Ee.a,null)):r.a.createElement("span",null),r.a.createElement(pe.a,{"aria-label":"toggle visibility",onClick:function(){return O(!h)},onMouseDown:function(e){return e.preventDefault()}},h?r.a.createElement(ge.a,null):r.a.createElement(he.a,null)))}),d.confirm?r.a.createElement(be.a,{"data-testid":Ve("PasswordConfirmError")},"Passwords do not match"):null),r.a.createElement(q.a,{color:"primary",className:Fe("Button"),"data-testid":Ve("Import"),disableElevation:!0,variant:"contained",type:"submit"},"Import"),r.a.createElement(q.a,{color:"primary",className:Fe("Button"),"data-testid":Ve("Back"),disableElevation:!0,onClick:a,variant:"outlined"},"Back"))))},ze=a(85),Ze=function(e){return e.register},_e=Object(ze.a)(Ze,(function(e){return e.stage})),Ge=Object(ze.a)(Ze,(function(e){return e.seed})),He=(Object(ze.a)(Ze,(function(e){return e.seedConfirmed})),Object(ze.a)(Ze,(function(e){return e.showSteps}))),Ue=Object(G.cn)("CreateAccountPage"),qe=U("CreateAccountPage"),Je=(a(376),Object(G.cn)("WalletPage")),$e=(a(377),a(213)),Xe=a.n($e),Ye=Object(G.cn)("AboutPage"),Ke=U("AboutPage"),Qe=a(214),et=Object(Qe.a)({palette:{action:{disabledBackground:"set color of background here",disabled:"set color of text here"}},typography:{button:{}},overrides:{MuiButton:{root:{fontSize:"1rem",fontFamily:'"Exo 2", "Roboto", "Helvetica", "Arial", sans-serif'}},MuiLinearProgress:{colorPrimary:{backgroundColor:"#eee"}}}});c.a.render(r.a.createElement(l.a,{theme:et},r.a.createElement(r.a.StrictMode,null,r.a.createElement(s.a,{store:Z},r.a.createElement(i.a,{persistor:_},r.a.createElement(u.a,{history:W},r.a.createElement(d.c,{history:W},r.a.createElement(d.d,null,r.a.createElement(d.b,{path:"/wellcome",exact:!0,component:function(){var e=Object(s.e)(_e),t=Object(s.e)(Ge),a=Object(s.e)(He),n=Object(s.d)();return r.a.createElement("div",{className:Ue(),"data-testid":qe()},e&&a?r.a.createElement(Me,{step:e,total:4,onBack:function(){return n(S.stepBack())}}):null,function(){switch(e){case m.STEP1:return r.a.createElement(oe,{onGenerate:function(){return n(S.generateSeed())}});case m.STEP2:return r.a.createElement(ie,{seed:t,onSubmit:function(){return n(S.submitSeed())}});case m.STEP3:return r.a.createElement(Be,{seed:t,onConfirm:function(){return n(S.confirmSeed())}});case m.STEP4:return r.a.createElement(we,{onRegister:function(e){return n(S.finishRegister(e))}});case m.IMPORT:return r.a.createElement(Le,{onImport:function(e){return n(S.finishImportAccount(e))},onBack:function(){return n(S.stepBack())}});default:return r.a.createElement(Ne,{onCreate:function(){return n(S.startRegisterAccount())},onImport:function(){return n(S.startImportAccount())},onAbout:function(){return n(Object(H.d)("/about"))}})}}())}}),r.a.createElement(d.b,{path:"/about",exact:!0,component:function(){var e=Object(s.d)();return r.a.createElement("div",{className:Ye(),"data-testid":"AboutPage"},r.a.createElement("img",{src:Xe.a,className:Ye("Logo"),"data-testid":Ke("Logo"),alt:"logo"}),r.a.createElement("h1",{className:Ye("Header")}," WHAT IS ZEROPOOL "),r.a.createElement("p",{className:Ye("Text")},"ZeroPool is fully private multi-blokchain solution. Low transaction fees, atomic swaps and common anonymity set. Balances and transaction graph are hidden and compatibility with network identity hiding technologies, like Tor. You can deposit, transfer and withdraw tokens in our product."),r.a.createElement("p",{className:Ye("Text")},"The projec was found at ethDenver by a group of reserchers and still developed as product with strong scientific base."),r.a.createElement("p",{className:Ye("Button")},r.a.createElement(q.a,{color:"primary","data-testid":Ke("BackButton"),disableElevation:!0,onClick:function(){return e(Object(H.d)("/"))},variant:"outlined"},"Back")))}}),r.a.createElement(d.b,{path:"/wallet",exact:!0,component:function(){return r.a.createElement("div",{className:Je(),"data-testid":"WalletPage"},r.a.createElement("h1",null," WalletPage "))}}),r.a.createElement(d.b,null,r.a.createElement(d.a,{to:"/wellcome"}))))))))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[224,1,2]]]);
//# sourceMappingURL=main.90388c79.chunk.js.map