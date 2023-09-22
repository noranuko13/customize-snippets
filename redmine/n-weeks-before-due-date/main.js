!function s(n,i,a){function o(t,e){if(!i[t]){if(!n[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(u)return u(t,!0);throw(e=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",e}r=i[t]={exports:{}},n[t][0].call(r.exports,function(e){return o(n[t][1][e]||e)},r,r.exports,s,n,i,a)}return i[t].exports}for(var u="function"==typeof require&&require,e=0;e<a.length;e++)o(a[e]);return o}({1:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});const n=e("../shared/animates"),i=e("../shared/issues");r=e("../shared/routes");const a=e("../shared/sanitizers");{const o=new(e("./script-query").ScriptQuery),s=()=>{const e=new i.Property;const t="csNwbdd";var r,s=document.getElementById(t)||((s=document.createElement("div")).id=t,s);s.textContent=o.text()+": "+(r=e.dueDate().input().value,(0,a.isDate)(r)?new Date(Date.parse(r)+6048e5*o.week()).toLocaleDateString("sv-SE").replaceAll("-","/"):"-"),e.dueDate().p().append(s),(0,n.flashBg)([e.dueDate().p()])};((0,r.isIssueShow)()||(0,r.isIssueNew)())&&(s(),(new i.Property).div().addEventListener("change",e=>{var e=e.target,t=new i.Property;t.dueDate().input().isEqualNode(e)&&s(),t.tracker().select().isEqualNode(e)&&setTimeout(()=>s(),700)}))}},{"../shared/animates":3,"../shared/issues":10,"../shared/routes":12,"../shared/sanitizers":13,"./script-query":2}],2:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.ScriptQuery=void 0;const s=e("../shared/sanitizers");r.ScriptQuery=class{constructor(){var e=document.currentScript.src;this.params=new URLSearchParams(new URL(e).search)}week(){var e=this.params.get("week")||"2";if((0,s.isInteger)(e))return Number(e);throw console.error("指定できるのは半角数字とマイナス符号のみです"),new ReferenceError}text(){var e=this.params.get("textKey")||"staging";if(!["staging","merge","week"].includes(e))throw console.error("指定できるのは staging, merge, week のみです"),new ReferenceError;switch(e){case"staging":return"ステージング目安";case"merge":return"マージ期限";case"week":return this.week()+"週間前";default:return""}}}},{"../shared/sanitizers":13}],3:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.flashBg=void 0;r.flashBg=e=>{e.forEach(e=>{e.animate({background:["#b3d9ff","#7fbfff","#b3d9ff"],easing:"ease-out"},{fill:"forwards",duration:400})})}},{}],4:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.DueDateAttr=void 0;r.DueDateAttr=class{constructor(e){this._p=e.querySelector("p:has(> #issue_due_date)")}p(){return this._p}input(){return this._p.querySelector("input")}}},{}],5:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.TrackerAttr=r.IntAttr=r.DueDateAttr=void 0;var s=e("./due-date-attr"),n=(Object.defineProperty(r,"DueDateAttr",{enumerable:!0,get:function(){return s.DueDateAttr}}),e("./int-attr")),i=(Object.defineProperty(r,"IntAttr",{enumerable:!0,get:function(){return n.IntAttr}}),e("./tracker-attr"));Object.defineProperty(r,"TrackerAttr",{enumerable:!0,get:function(){return i.TrackerAttr}})},{"./due-date-attr":4,"./int-attr":6,"./tracker-attr":7}],6:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.IntAttr=void 0;r.IntAttr=class{constructor(e){this._p=e}p(){return this._p}name(){var e=(this._p.querySelector("label span.field-description")||this._p.querySelector("label span"))?.textContent||"";return""===e&&console.warn("属性名が取得できませんでした",this._p),e}input(){return this._p.querySelector("input")}}},{}],7:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.TrackerAttr=void 0;r.TrackerAttr=class{constructor(e){this._p=e.querySelector("p:has(> #issue_tracker_id)")}select(){return this._p.querySelector("select")}}},{}],8:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.Formula=void 0;const s=e("../../animates"),n=e("../../sanitizers"),i=e("../property");r.Formula=class{constructor(e){this.option=e,this.intAttrs=(new i.Property).intCustomFields(),this.decorate(),this.normalize()}execute(){var e=this.factors().map(e=>Number(e.input().value));this.result().input().value=this.option.calc(e).toString(),(0,s.flashBg)(this.targets().map(e=>e.p()))}factors(){const t=new RegExp(this.option.nameKey+"$");return this.intAttrs.filter(e=>t.test(e.name()))}result(){const t=new RegExp(`［${this.option.nameKey}］$`);var e=this.intAttrs.filter(e=>t.test(e.name()));if(1!==e.length)throw console.error(`［${this.option.nameKey}］が複数設定されています`,e),new ReferenceError;return e[0]}targets(){return[...this.factors(),this.result()]}decorate(){this.targets().forEach(e=>{e.p().classList.add(`cs-${this.option.key}-target`)}),this.result().input().readOnly=!0,this.result().input().classList.add(`cs-${this.option.key}-effect`)}normalize(){var e=this.factors().map(e=>e.input());(0,n.sanitizeWithOne)(e)}}},{"../../animates":3,"../../sanitizers":13,"../property":11}],9:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.Formula=void 0;var s=e("./formula");Object.defineProperty(r,"Formula",{enumerable:!0,get:function(){return s.Formula}})},{"./formula":8}],10:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.Property=r.Formula=r.TrackerAttr=r.IntAttr=void 0;var s=e("./attrs"),n=(Object.defineProperty(r,"IntAttr",{enumerable:!0,get:function(){return s.IntAttr}}),Object.defineProperty(r,"TrackerAttr",{enumerable:!0,get:function(){return s.TrackerAttr}}),e("./concepts")),i=(Object.defineProperty(r,"Formula",{enumerable:!0,get:function(){return n.Formula}}),e("./property"));Object.defineProperty(r,"Property",{enumerable:!0,get:function(){return i.Property}})},{"./attrs":5,"./concepts":9,"./property":11}],11:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.Property=void 0;const s=e("./attrs");r.Property=class{constructor(){this._div=document.querySelector("div#all_attributes")}div(){return this._div}tracker(){return new s.TrackerAttr(this._div)}dueDate(){return new s.DueDateAttr(this._div)}intCustomFields(){var e=this._div.querySelectorAll("p:has(> .int_cf)");return Array.from(e).map(e=>new s.IntAttr(e))}}},{"./attrs":5}],12:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.isIssueNew=r.isIssueShow=void 0;r.isIssueShow=()=>/^\/issues\/\d+$/.test(location.pathname);r.isIssueNew=()=>/^\/projects\/\w+\/issues\/new$/.test(location.pathname)},{}],13:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.isInteger=r.isDate=r.sanitizeWithOne=void 0;r.sanitizeWithOne=e=>{e.map(e=>{(0,r.isInteger)(e.value)||(e.value="1")})},r.isDate=e=>/^\d{4}-\d{2}-\d{2}$/.test(e);r.isInteger=e=>/^-?([1-9]\d*|0)$/.test(e)},{}]},{},[1]);