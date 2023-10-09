!function s(n,o,a){function i(t,e){if(!o[t]){if(!n[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(u)return u(t,!0);throw(e=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",e}r=o[t]={exports:{}},n[t][0].call(r.exports,function(e){return i(n[t][1][e]||e)},r,r.exports,s,n,o,a)}return o[t].exports}for(var u="function"==typeof require&&require,e=0;e<a.length;e++)i(a[e]);return i}({1:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});const n=e("../shared/animates"),o=e("../shared/issues"),s=e("../shared/processes");r=e("../shared/routes");const a=e("../shared/sanitizers");{const i=new(e("./script-query").ScriptQuery),u=()=>{const e=new o.Property;const t="csNwbdd";var r,s=document.getElementById(t)||((s=document.createElement("div")).id=t,s);s.textContent=i.text()+": "+(r=e.dueDate().input().value,(0,a.isDate)(r)?new Date(Date.parse(r)+6048e5*i.week()).toLocaleDateString("sv-SE").replaceAll("-","/"):"-"),e.dueDate().p().append(s),(0,n.flashBg)([e.dueDate().p()])};((0,r.isIssueShow)()||(0,r.isIssueNew)())&&(window.addEventListener("load",()=>{(0,s.handler)(()=>{u()})}),(new o.Property).div().addEventListener("change",async r=>{await(0,s.wait)(400),(0,s.handler)(()=>{var e=r.target,t=new o.Property;t.dueDate().input().id!==e.id&&t.tracker().select().id!==e.id&&t.status().select().id!==e.id||u()})}))}},{"../shared/animates":3,"../shared/issues":13,"../shared/processes":15,"../shared/routes":16,"../shared/sanitizers":17,"./script-query":2}],2:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.ScriptQuery=void 0;const s=e("../shared/sanitizers");r.ScriptQuery=class{params;constructor(){var e=document.currentScript.src;this.params=new URLSearchParams(new URL(e).search)}week(){var e=this.params.get("week")||"2";if((0,s.isInteger)(e))return Number(e);throw console.error("指定できるのは半角数字とマイナス符号のみです"),new ReferenceError}text(){var e=this.params.get("textKey")||"staging";if(!["staging","merge","week"].includes(e))throw console.error("指定できるのは staging, merge, week のみです"),new ReferenceError;switch(e){case"staging":return"ステージング目安";case"merge":return"マージ期限";case"week":return this.week()+"週間前";default:return""}}}},{"../shared/sanitizers":17}],3:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.flashBg=void 0;r.flashBg=e=>{e.forEach(e=>{e.animate({background:["#b3d9ff","#7fbfff","#b3d9ff"],easing:"ease-out"},{fill:"forwards",duration:400})})}},{}],4:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.WarnNoTargetError=void 0;var s=e("./warn-no-target-error");Object.defineProperty(r,"WarnNoTargetError",{enumerable:!0,get:function(){return s.WarnNoTargetError}})},{"./warn-no-target-error":5}],5:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.WarnNoTargetError=void 0;class s extends Error{constructor(e,t){console.warn(e,t),super(e),this.name="WarnNoTargetError"}}r.WarnNoTargetError=s},{}],6:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.DueDateAttr=void 0;const s=e("../../errors");r.DueDateAttr=class{_p;constructor(e){var t=e.querySelector("p:has(> #issue_due_date)");if(!t)throw new s.WarnNoTargetError("期日が設定されていません",e);this._p=t}p(){return this._p}input(){return this._p.querySelector("input")}}},{"../../errors":4}],7:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.TrackerAttr=r.StatusAttr=r.IntAttr=r.DueDateAttr=void 0;var s=e("./due-date-attr"),n=(Object.defineProperty(r,"DueDateAttr",{enumerable:!0,get:function(){return s.DueDateAttr}}),e("./int-attr")),o=(Object.defineProperty(r,"IntAttr",{enumerable:!0,get:function(){return n.IntAttr}}),e("./status-attr")),a=(Object.defineProperty(r,"StatusAttr",{enumerable:!0,get:function(){return o.StatusAttr}}),e("./tracker-attr"));Object.defineProperty(r,"TrackerAttr",{enumerable:!0,get:function(){return a.TrackerAttr}})},{"./due-date-attr":6,"./int-attr":8,"./status-attr":9,"./tracker-attr":10}],8:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.IntAttr=void 0;r.IntAttr=class{_p;constructor(e){this._p=e}p(){return this._p}name(){var e=(this._p.querySelector("label span.field-description")||this._p.querySelector("label span"))?.textContent||"";return""===e&&console.warn("属性名が取得できませんでした",this._p),e}input(){return this._p.querySelector("input")}}},{}],9:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.StatusAttr=void 0;const s=e("../../errors");r.StatusAttr=class{_p;constructor(e){var t=e.querySelector("p:has(> #issue_status_id)");if(!t)throw new s.WarnNoTargetError("ステータスが設定されていません",e);this._p=t}select(){return this._p.querySelector("select")}}},{"../../errors":4}],10:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.TrackerAttr=void 0;const s=e("../../errors");r.TrackerAttr=class{_p;constructor(e){var t=e.querySelector("p:has(> #issue_tracker_id)");if(!t)throw new s.WarnNoTargetError("期日が設定されていません",e);this._p=t}select(){return this._p.querySelector("select")}}},{"../../errors":4}],11:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.Formula=void 0;const s=e("../../animates"),n=e("../../errors"),o=e("../../sanitizers"),a=e("../property");r.Formula=class{option;intAttrs;constructor(e){this.option=e,this.intAttrs=(new a.Property).intCustomFields(),this.decorate(),this.normalize()}execute(){var e=this.factors().map(e=>Number(e.input().value));this.result().input().value=this.option.calc(e).toString(),(0,s.flashBg)(this.targets().map(e=>e.p()))}factors(){const t=new RegExp(this.option.nameKey+"$");return this.intAttrs.filter(e=>t.test(e.name()))}result(){const t=new RegExp(`［${this.option.nameKey}］$`);var e=this.intAttrs.filter(e=>t.test(e.name()));if(0===e.length)throw new n.WarnNoTargetError(`［${this.option.nameKey}］が設定されていません`,e);if(1!==e.length)throw new n.WarnNoTargetError(`［${this.option.nameKey}］が複数設定されています`,e);return e[0]}targets(){return[...this.factors(),this.result()]}decorate(){this.targets().forEach(e=>{e.p().classList.add(`cs-${this.option.key}-target`)}),this.result().input().readOnly=!0,this.result().input().classList.add(`cs-${this.option.key}-effect`)}normalize(){var e=this.factors().map(e=>e.input());(0,o.sanitizeWithOne)(e)}}},{"../../animates":3,"../../errors":4,"../../sanitizers":17,"../property":14}],12:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.Formula=void 0;var s=e("./formula");Object.defineProperty(r,"Formula",{enumerable:!0,get:function(){return s.Formula}})},{"./formula":11}],13:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.Property=r.Formula=r.TrackerAttr=r.IntAttr=void 0;var s=e("./attrs"),n=(Object.defineProperty(r,"IntAttr",{enumerable:!0,get:function(){return s.IntAttr}}),Object.defineProperty(r,"TrackerAttr",{enumerable:!0,get:function(){return s.TrackerAttr}}),e("./concepts")),o=(Object.defineProperty(r,"Formula",{enumerable:!0,get:function(){return n.Formula}}),e("./property"));Object.defineProperty(r,"Property",{enumerable:!0,get:function(){return o.Property}})},{"./attrs":7,"./concepts":12,"./property":14}],14:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.Property=void 0;const s=e("../errors"),n=e("./attrs");r.Property=class{_div;constructor(){var e=document.querySelector("div#all_attributes");if(!e)throw new s.WarnNoTargetError("チケットの編集画面ではありません",document);this._div=e}div(){return this._div}tracker(){return new n.TrackerAttr(this._div)}status(){return new n.StatusAttr(this._div)}dueDate(){return new n.DueDateAttr(this._div)}intCustomFields(){var e=this._div.querySelectorAll("p:has(> .int_cf)");return Array.from(e).map(e=>new n.IntAttr(e))}}},{"../errors":4,"./attrs":7}],15:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.wait=r.handler=void 0;const s=e("./errors");r.handler=e=>{try{e()}catch(e){if(!(e instanceof s.WarnNoTargetError))throw e}};r.wait=t=>new Promise(e=>{setTimeout(e,t)})},{"./errors":4}],16:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.isIssueNew=r.isIssueShow=void 0;r.isIssueShow=()=>/^\/issues\/\d+$/.test(location.pathname);r.isIssueNew=()=>/^\/projects\/\w+\/issues\/new$/.test(location.pathname)},{}],17:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.isInteger=r.isDate=r.sanitizeWithOne=void 0;r.sanitizeWithOne=e=>{e.map(e=>{(0,r.isInteger)(e.value)||(e.value="1")})},r.isDate=e=>/^\d{4}-\d{2}-\d{2}$/.test(e);r.isInteger=e=>/^-?([1-9]\d*|0)$/.test(e)},{}]},{},[1]);