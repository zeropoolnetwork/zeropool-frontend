(this.webpackJsonpzeropool=this.webpackJsonpzeropool||[]).push([[0],{203:function(e,t,a){e.exports=a.p+"static/media/guy-fawkes-thanks.0609f8d3.png"},205:function(e,t,a){e.exports=a.p+"static/media/logo.38e575e9.svg"},217:function(e,t,a){e.exports=a(363)},228:function(e,t,a){},233:function(e,t){},235:function(e,t){},244:function(e,t){},246:function(e,t){},273:function(e,t){},275:function(e,t){},276:function(e,t){},282:function(e,t){},284:function(e,t){},302:function(e,t){},304:function(e,t){},316:function(e,t){},319:function(e,t){},350:function(e,t,a){},351:function(e,t,a){},352:function(e,t,a){},353:function(e,t,a){},354:function(e,t,a){},356:function(e,t,a){},357:function(e,t,a){},358:function(e,t,a){},359:function(e,t,a){},360:function(e,t,a){},361:function(e,t,a){},362:function(e,t,a){},363:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(22),c=a.n(o),i=a(33),s=a(195),l=a(398),u=a(61),d=a(106);a(228),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var m,f=a(196),p=a.n(f),b=a(199),E=a(192),g=a(399),h=a(402),O=a(107),j=a(35),v=a(21),S=a(29),w={stepBack:Object(S.createAction)("@register/stepBack")(),startRegisterAccount:Object(S.createAction)("@register/startRegisterAccount")(),generateSeed:Object(S.createAction)("@register/generateSeed")(),submitSeed:Object(S.createAction)("@register/submitSeed")(),confirmSeed:Object(S.createAction)("@register/confirmSeed")(),finishRegister:Object(S.createAction)("@register/register")(),startImportAccount:Object(S.createAction)("@register/startImportAccount")(),finishImportAccount:Object(S.createAction)("@register/importAccount")()};!function(e){e[e.STEP1=1]="STEP1",e[e.STEP2=2]="STEP2",e[e.STEP3=3]="STEP3",e[e.STEP4=4]="STEP4",e[e.IMPORT=5]="IMPORT"}(m||(m={}));var k,y=a(84).randomBytes,P=a(322).Mnemonic,N={stage:void 0,seed:[],seedConfirmed:!1,showSteps:!1},A=Object(S.createReducer)(N).handleAction(w.stepBack,(function(e){return Object(v.a)(Object(v.a)({},e),function(e){return e.stage===m.IMPORT?{stage:void 0,showSteps:!1,seed:[]}:{stage:e.stage===m.STEP1?void 0:Number(e.stage)-1,showSteps:![1,void 0].includes(e.stage),seed:e.stage===m.STEP2?[]:e.seed}}(e))})).handleAction(w.startRegisterAccount,(function(e){return Object(v.a)(Object(v.a)({},e),{},{showSteps:!0,stage:m.STEP1})})).handleAction(w.generateSeed,(function(e){return Object(v.a)(Object(v.a)({},e),{},{seed:P.generate(y(32)).words.reduce((function(e,t){return e.length<12&&!e.includes(t)&&e.push(t),e}),[]),seedConfirmed:!1,stage:m.STEP2})})).handleAction(w.submitSeed,(function(e){return Object(v.a)(Object(v.a)({},e),{},{seedConfirmed:!1,stage:m.STEP3})})).handleAction(w.confirmSeed,(function(e){return Object(v.a)(Object(v.a)({},e),{},{seedConfirmed:!0,stage:m.STEP4})})).handleAction(w.finishRegister,(function(e,t){return Object(v.a)(Object(v.a)({},e),{},{showSteps:!1,stage:void 0})})).handleAction(w.startImportAccount,(function(e){return Object(v.a)(Object(v.a)({},e),{},{hideSteps:!0,stage:m.IMPORT})})),B=a(407),C=a(388),T=a(197),I=a(387),x=function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];var n=1===t.length,r=n?t[0]:t;return Object(T.a)(Object(I.a)(Object(S.isActionOf)(r)))},R=Object(h.a)((function(e,t){return e.pipe(x(w.finishImportAccount),Object(B.a)((function(e){console.log(e)})),Object(C.a)())}),(function(e,t){return e.pipe(x(w.finishRegister),Object(B.a)((function(e){console.log(e)})),Object(C.a)())})),M={0:function(e){var t=Object(v.a)({},e);return Object(v.a)({},t)}},D=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||j.d,W=Object(g.a)(),F=Object(h.a)(R),L=Object(b.a)(),_={key:"root",version:0,storage:p.a,migrate:Object(O.a)(M,{debug:!1}),whitelist:["registerPage"]},z=Object(O.b)(_,(k=L,Object(j.c)({register:A,router:Object(u.b)(k)}))),G=Object(j.e)(z,D(Object(j.a)(W,Object(E.a)(L)))),V=Object(O.c)(G);W.run(F);var H=a(11),Z=a(25),J=(a(350),function(e){return function(){for(var t=arguments.length,a=new Array(t),n=0;n<t;n++)a[n]=arguments[n];return a.reduce((function(e,t){return"".concat(e,"-").concat(t)}),e)}}),U=a(391),q=(a(351),a(13)),X=a(20),Y=a(389),$=(a(352),a(353),Object(H.cn)("SeedTag")),K=J("SeedTag"),Q=function(e){var t=e.text,a=e.number,n=e.hidden,o=e.hideNumber,c=e.onClick;return r.a.createElement("div",{className:$({Placeholder:n}),"data-testid":K(),onClick:function(){return c&&!n?c(a):null}},n||o?null:r.a.createElement("div",{className:$("Number")},a+1),r.a.createElement("div",{className:$("Text")},n?t.split("").sort((function(){return.5-Math.random()})).join(""):t))},ee=Object(H.cn)("SeedPanel"),te=J("SeedPanel"),ae=function(e){var t=e.seed,a=e.check,o=e.onCheck,c=Object(n.useState)([]),i=Object(X.a)(c,2),s=i[0],l=i[1],u=Object(n.useState)(!1),d=Object(X.a)(u,2),m=d[0],f=d[1],p=Object(n.useState)([]),b=Object(X.a)(p,2),E=b[0],g=b[1];Object(n.useEffect)((function(){!E.length&&a&&g(Object(q.a)(t).sort((function(){return.5-Math.random()})))}),[E.length,a,t]),Object(n.useEffect)((function(){var e=JSON.stringify(t)===JSON.stringify(s);f(e),o&&o(e)}),[m,s,t,o]);var h=function(e){s.splice(e,1),l(Object(q.a)(s)),f(!1)},O=function(e){l([].concat(Object(q.a)(s),[t[e]]))};return r.a.createElement(Y.a,{className:ee(),"data-testid":te()},r.a.createElement("div",{className:ee("Body"),"data-testid":te("Body")},a?s.map((function(e,t){return r.a.createElement(Q,{text:e,number:t,key:t,onClick:h})})):t.map((function(e,t){return r.a.createElement(Q,{text:e,number:t,key:t})}))),r.a.createElement("div",{className:ee("Footer"),"data-testid":te("Footer")},a?E.map((function(e,a){return r.a.createElement(Q,{text:e,number:t.findIndex((function(t){return t===e})),hidden:s.includes(e),hideNumber:!0,key:t.findIndex((function(t){return t===e})),onClick:O})})):null,s.length!==t.length||m?null:r.a.createElement("div",{className:ee("Warning"),"data-testid":te("Warning")},"The phrases do not match!")))},ne=Object(H.cn)("StepOne"),re=J("StepOne"),oe=function(e){var t=e.onGenerate;return r.a.createElement("div",{className:ne(),"data-testid":re()},r.a.createElement("section",null,r.a.createElement(ae,{seed:[]}),r.a.createElement("p",null,"Your secret phrase consists of 12 words. Store it carefully. If you loose it, you will loose access to all of your associated wallets!")),r.a.createElement(U.a,{color:"primary",className:ne("Button"),"data-testid":re("GenerateButton"),disableElevation:!0,onClick:t,variant:"contained"},"Generate a secret phrase"))},ce=(a(354),Object(H.cn)("StepTwo")),ie=J("StepTwo"),se=function(e){var t=e.seed,a=e.onSubmit;return r.a.createElement("div",{className:ce(),"data-testid":"StepTwo"},r.a.createElement("section",null,r.a.createElement(ae,{seed:t}),r.a.createElement("p",null,"By submiting, you confirm that you have stored the secret phrase on paper or using another safe method.")),r.a.createElement(U.a,{color:"primary",className:ce("Button"),"data-testid":ie("SubmitButton"),disableElevation:!0,onClick:a,variant:"contained"},"Submit"))},le=a(208),ue=(a(356),a(403)),de=a(404),me=a(401),fe=a(405),pe=a(392),be=a(396),Ee=a(393),ge=a(394),he=a(395),Oe=Object(H.cn)("StepFour"),je=J("StepFour"),ve={required:"Required",pattern:{value:/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/,message:"Use letters and numbers"},minLength:{value:8,message:"Use at least 8 characters"}},Se=function(e){var t=e.onRegister,a=Object(le.a)({criteriaMode:"all"}),o=a.handleSubmit,c=a.register,i=a.reset,s=a.control,l=a.errors,u=Object(n.useState)(!1),d=Object(X.a)(u,2),m=d[0],f=d[1],p=Object(n.useState)(""),b=Object(X.a)(p,2),E=b[0],g=b[1],h=Object(n.useState)(""),O=Object(X.a)(h,2),j=O[0],v=O[1];return r.a.createElement("div",{className:Oe(),"data-testid":je()},r.a.createElement("section",null,r.a.createElement("form",{onSubmit:function(){o(t)},className:Oe("Form")},r.a.createElement(ue.a,{className:Oe("FormControl"),error:!!l.password},r.a.createElement(de.a,{htmlFor:"password"},"Password"),r.a.createElement(me.a,{id:"password",className:Oe("Password"),inputProps:{"data-testid":je("Password")},inputRef:c(ve),name:"password",value:E,onChange:function(){return g(s.getValues().password)},type:m?"text":"password",endAdornment:r.a.createElement(fe.a,{position:"end"},E?r.a.createElement(pe.a,{"aria-label":"empty password",onClick:function(){i({password:void 0,confirm:s.getValues().confirm}),g("")},onMouseDown:function(e){return e.preventDefault()}},r.a.createElement(Ee.a,null)):null,r.a.createElement(pe.a,{"aria-label":"toggle visibility",onClick:function(){return f(!m)},onMouseDown:function(e){return e.preventDefault()}},m?r.a.createElement(ge.a,null):r.a.createElement(he.a,null)))}),l.password?r.a.createElement(be.a,{"data-testid":je("PasswordError")},l.password.message):null),r.a.createElement(ue.a,{className:Oe("FormControl"),error:!!l.confirm},r.a.createElement(de.a,{htmlFor:"confirm"},"Confirm password"),r.a.createElement(me.a,{id:"confirm",className:Oe("Password"),inputProps:{"data-testid":je("Confirm")},inputRef:c({validate:function(e){return e===s.getValues().password}}),name:"confirm",value:j,onChange:function(){return v(s.getValues().confirm)},type:m?"text":"password",endAdornment:r.a.createElement(fe.a,{position:"end"},j?r.a.createElement(pe.a,{"aria-label":"empty confirmation",onClick:function(){i({password:s.getValues().password,confirm:void 0}),v("")},onMouseDown:function(e){return e.preventDefault()}},r.a.createElement(Ee.a,null)):null,r.a.createElement(pe.a,{"aria-label":"toggle visibility",onClick:function(){return f(!m)},onMouseDown:function(e){return e.preventDefault()}},m?r.a.createElement(ge.a,null):r.a.createElement(he.a,null)))}),l.confirm?r.a.createElement(be.a,{"data-testid":je("PasswordConfirmError")},"Passwords do not match"):null),r.a.createElement("p",null,"Finally, please choose a password to be used to export your account secret in the future."),r.a.createElement("p",null,r.a.createElement(U.a,{color:"primary",className:Oe("Button"),"data-testid":je("Submit"),disableElevation:!0,variant:"contained",type:"submit"},"Register")))))},we=(a(357),a(203)),ke=a.n(we),ye=Object(H.cn)("Welcome"),Pe=J("Welcome"),Ne=function(e){var t=e.onCreate,a=e.onImport,r=e.onAbout;return n.createElement("div",{className:ye(),"data-testid":Pe()},n.createElement("section",null,n.createElement("img",{src:ke.a,className:ye("Logo"),"data-testid":Pe("Logo"),alt:"logo"}),n.createElement("h1",{className:ye("Greeting"),"data-testid":Pe("Greeting")},"Welcome to ZeroPool"),n.createElement("p",{className:ye("Description"),"data-testid":Pe("Description")},"Please create an account or import an existing one using a secret phrase")),n.createElement(U.a,{color:"primary",className:ye("Button"),"data-testid":Pe("CreateButton"),disableElevation:!0,onClick:t,variant:"contained"},"Create new account"),n.createElement(U.a,{variant:"outlined",color:"primary",className:ye("Button"),"data-testid":Pe("ImportButton"),onClick:a},"Import existed"),n.createElement(U.a,{variant:"outlined",color:"primary",className:ye("Button"),"data-testid":Pe("AboutButton"),onClick:r},"About zeropool"))},Ae=(a(358),Object(H.cn)("StepThree")),Be=J("StepThree"),Ce=function(e){var t=e.seed,a=e.onConfirm,o=Object(n.useState)(!0),c=Object(X.a)(o,2),i=c[0],s=c[1];return r.a.createElement("div",{className:Ae(),"data-testid":"StepThree"},r.a.createElement("section",null,r.a.createElement(ae,{seed:t,check:!0,onCheck:function(e){return s(!e)}}),r.a.createElement("p",null,"Please confirm your secret phrase. We want to be sure that you saved it correctly.")),r.a.createElement(U.a,{color:"primary",className:Ae("Button",{Disabled:i}),"data-testid":Be("ConfirmButton"),disabled:i,disableElevation:!0,onClick:a,variant:"contained"},"Confirm"))},Te=a(397),Ie=a(400),xe=a(406),Re=(a(359),Object(H.cn)("StepHeader")),Me=J("StepHeader"),De=function(e){var t=e.step,a=e.total,n=e.onBack;return r.a.createElement("div",{className:Re(),"data-testid":Me()},r.a.createElement(Ie.a,{title:"Step back",placement:"top-end"},r.a.createElement(U.a,{className:Re("Button"),"data-testid":Me("BackButton"),onClick:n,disableRipple:!0},r.a.createElement(Te.a,{className:Re("Icon")}))),r.a.createElement("p",{className:Re("Text"),"data-testid":Me("Text")},"Step ",t," of ",a),r.a.createElement(xe.a,{className:Re("Progress"),variant:"progress",steps:a+1,position:"static",activeStep:t-1,backButton:r.a.createElement("span",{className:"hidden"},"back"),nextButton:r.a.createElement("span",{className:"hidden"},"next")}))},We=(a(360),Object(H.cn)("ImportAccount")),Fe=J("ImportAccount"),Le=function(e){var t=e.onBack,a=e.onImport,n=[];return r.a.createElement("div",{className:We(),"data-testid":Fe()},r.a.createElement("section",null,r.a.createElement("h1",null," ImportAccount ")),r.a.createElement(U.a,{color:"primary","data-testid":Fe("ImportButton"),disableElevation:!0,onClick:function(){return a({seed:n,password:""})},variant:"contained"},"Import"),r.a.createElement(U.a,{color:"primary","data-testid":Fe("BackButton"),disableElevation:!0,onClick:t,variant:"outlined"},"Back"))},_e=a(82),ze=function(e){return e.register},Ge=Object(_e.a)(ze,(function(e){return e.stage})),Ve=Object(_e.a)(ze,(function(e){return e.seed})),He=(Object(_e.a)(ze,(function(e){return e.seedConfirmed})),Object(_e.a)(ze,(function(e){return e.showSteps}))),Ze=Object(H.cn)("CreateAccountPage"),Je=J("CreateAccountPage"),Ue=(a(361),Object(H.cn)("WalletPage")),qe=(a(362),a(205)),Xe=a.n(qe),Ye=Object(H.cn)("AboutPage"),$e=J("AboutPage"),Ke=a(206),Qe=Object(Ke.a)({palette:{action:{disabledBackground:"set color of background here",disabled:"set color of text here"}},typography:{button:{}},overrides:{MuiButton:{root:{fontSize:"1rem",fontFamily:'"Exo 2", "Roboto", "Helvetica", "Arial", sans-serif'}},MuiLinearProgress:{colorPrimary:{backgroundColor:"#eee"}}}});c.a.render(r.a.createElement(l.a,{theme:Qe},r.a.createElement(r.a.StrictMode,null,r.a.createElement(i.a,{store:G},r.a.createElement(s.a,{persistor:V},r.a.createElement(u.a,{history:L},r.a.createElement(d.c,{history:L},r.a.createElement(d.d,null,r.a.createElement(d.b,{path:"/wellcome",exact:!0,component:function(){var e=Object(i.e)(Ge),t=Object(i.e)(Ve),a=Object(i.e)(He),n=Object(i.d)();return r.a.createElement("div",{className:Ze(),"data-testid":Je()},e&&a?r.a.createElement(De,{step:e,total:4,onBack:function(){return n(w.stepBack())}}):null,function(){switch(e){case m.STEP1:return r.a.createElement(oe,{onGenerate:function(){return n(w.generateSeed())}});case m.STEP2:return r.a.createElement(se,{seed:t,onSubmit:function(){return n(w.submitSeed())}});case m.STEP3:return r.a.createElement(Ce,{seed:t,onConfirm:function(){return n(w.confirmSeed())}});case m.STEP4:return r.a.createElement(Se,{onRegister:function(e){return n(w.finishRegister(e))}});case m.IMPORT:return r.a.createElement(Le,{onImport:function(e){return n(w.finishImportAccount(e))},onBack:function(){return n(w.stepBack())}});default:return r.a.createElement(Ne,{onCreate:function(){return n(w.startRegisterAccount())},onImport:function(){return n(w.startImportAccount())},onAbout:function(){return n(Object(Z.d)("/about"))}})}}())}}),r.a.createElement(d.b,{path:"/about",exact:!0,component:function(){var e=Object(i.d)();return r.a.createElement("div",{className:Ye(),"data-testid":"AboutPage"},r.a.createElement("img",{src:Xe.a,className:Ye("Logo"),"data-testid":$e("Logo"),alt:"logo"}),r.a.createElement("h1",{className:Ye("Header")}," WHAT IS ZEROPOOL "),r.a.createElement("p",{className:Ye("Text")},"ZeroPool is fully private multi-blokchain solution. Low transaction fees, atomic swaps and common anonymity set. Balances and transaction graph are hidden and compatibility with network identity hiding technologies, like Tor. You can deposit, transfer and withdraw tokens in our product."),r.a.createElement("p",{className:Ye("Text")},"The projec was found at ethDenver by a group of reserchers and still developed as product with strong scientific base."),r.a.createElement("p",{className:Ye("Button")},r.a.createElement(U.a,{color:"primary","data-testid":$e("BackButton"),disableElevation:!0,onClick:function(){return e(Object(Z.d)("/"))},variant:"outlined"},"Back")))}}),r.a.createElement(d.b,{path:"/wallet",exact:!0,component:function(){return r.a.createElement("div",{className:Ue(),"data-testid":"WalletPage"},r.a.createElement("h1",null," WalletPage "))}}),r.a.createElement(d.b,null,r.a.createElement(d.a,{to:"/wellcome"}))))))))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[217,1,2]]]);
//# sourceMappingURL=main.34cc7f69.chunk.js.map