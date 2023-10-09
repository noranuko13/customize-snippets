!function s(n,o,i){function a(e,t){if(!o[e]){if(!n[e]){var r="function"==typeof require&&require;if(!t&&r)return r(e,!0);if(u)return u(e,!0);throw(t=new Error("Cannot find module '"+e+"'")).code="MODULE_NOT_FOUND",t}r=o[e]={exports:{}},n[e][0].call(r.exports,function(t){return a(n[e][1][t]||t)},r,r.exports,s,n,o,i)}return o[e].exports}for(var u="function"==typeof require&&require,t=0;t<i.length;t++)a(i[t]);return a}({1:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});const n=t("../shared/issues"),o=t("../shared/processes");r=t("../shared/routes");{const i={key:"mcf",nameKey:"＊",calc:t=>t.reduce((t,e)=>t*e,1)};((0,r.isIssueShow)()||(0,r.isIssueNew)())&&(window.addEventListener("load",()=>{(0,o.handler)(()=>{new n.Formula(i).execute()})}),(new n.Property).div().addEventListener("change",async s=>{await(0,o.wait)(400),(0,o.handler)(()=>{const e=s.target;var t=new n.Property,r=new n.Formula(i);!r.factors().some(t=>t.input().id===e.id)&&t.tracker().select().id!==e.id&&t.status().select().id!==e.id||r.execute()})}))}},{"../shared/issues":12,"../shared/processes":14,"../shared/routes":15}],2:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.flashBg=void 0;r.flashBg=t=>{t.forEach(t=>{t.animate({background:["#b3d9ff","#7fbfff","#b3d9ff"],easing:"ease-out"},{fill:"forwards",duration:400})})}},{}],3:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.WarnNoTargetError=void 0;var s=t("./warn-no-target-error");Object.defineProperty(r,"WarnNoTargetError",{enumerable:!0,get:function(){return s.WarnNoTargetError}})},{"./warn-no-target-error":4}],4:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.WarnNoTargetError=void 0;class s extends Error{constructor(t,e){console.warn(t,e),super(t),this.name="WarnNoTargetError"}}r.WarnNoTargetError=s},{}],5:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.DueDateAttr=void 0;const s=t("../../errors");r.DueDateAttr=class{_p;constructor(t){var e=t.querySelector("p:has(> #issue_due_date)");if(!e)throw new s.WarnNoTargetError("期日が設定されていません",t);this._p=e}p(){return this._p}input(){return this._p.querySelector("input")}}},{"../../errors":3}],6:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.TrackerAttr=r.StatusAttr=r.IntAttr=r.DueDateAttr=void 0;var s=t("./due-date-attr"),n=(Object.defineProperty(r,"DueDateAttr",{enumerable:!0,get:function(){return s.DueDateAttr}}),t("./int-attr")),o=(Object.defineProperty(r,"IntAttr",{enumerable:!0,get:function(){return n.IntAttr}}),t("./status-attr")),i=(Object.defineProperty(r,"StatusAttr",{enumerable:!0,get:function(){return o.StatusAttr}}),t("./tracker-attr"));Object.defineProperty(r,"TrackerAttr",{enumerable:!0,get:function(){return i.TrackerAttr}})},{"./due-date-attr":5,"./int-attr":7,"./status-attr":8,"./tracker-attr":9}],7:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.IntAttr=void 0;r.IntAttr=class{_p;constructor(t){this._p=t}p(){return this._p}name(){var t=(this._p.querySelector("label span.field-description")||this._p.querySelector("label span"))?.textContent||"";return""===t&&console.warn("属性名が取得できませんでした",this._p),t}input(){return this._p.querySelector("input")}}},{}],8:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.StatusAttr=void 0;const s=t("../../errors");r.StatusAttr=class{_p;constructor(t){var e=t.querySelector("p:has(> #issue_status_id)");if(!e)throw new s.WarnNoTargetError("ステータスが設定されていません",t);this._p=e}select(){return this._p.querySelector("select")}}},{"../../errors":3}],9:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.TrackerAttr=void 0;const s=t("../../errors");r.TrackerAttr=class{_p;constructor(t){var e=t.querySelector("p:has(> #issue_tracker_id)");if(!e)throw new s.WarnNoTargetError("期日が設定されていません",t);this._p=e}select(){return this._p.querySelector("select")}}},{"../../errors":3}],10:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.Formula=void 0;const s=t("../../animates"),n=t("../../errors"),o=t("../../sanitizers"),i=t("../property");r.Formula=class{option;intAttrs;constructor(t){this.option=t,this.intAttrs=(new i.Property).intCustomFields(),this.decorate(),this.normalize()}execute(){var t=this.factors().map(t=>Number(t.input().value));this.result().input().value=this.option.calc(t).toString(),(0,s.flashBg)(this.targets().map(t=>t.p()))}factors(){const e=new RegExp(this.option.nameKey+"$");return this.intAttrs.filter(t=>e.test(t.name()))}result(){const e=new RegExp(`［${this.option.nameKey}］$`);var t=this.intAttrs.filter(t=>e.test(t.name()));if(0===t.length)throw new n.WarnNoTargetError(`［${this.option.nameKey}］が設定されていません`,t);if(1!==t.length)throw new n.WarnNoTargetError(`［${this.option.nameKey}］が複数設定されています`,t);return t[0]}targets(){return[...this.factors(),this.result()]}decorate(){this.targets().forEach(t=>{t.p().classList.add(`cs-${this.option.key}-target`)}),this.result().input().readOnly=!0,this.result().input().classList.add(`cs-${this.option.key}-effect`)}normalize(){var t=this.factors().map(t=>t.input());(0,o.sanitizeWithOne)(t)}}},{"../../animates":2,"../../errors":3,"../../sanitizers":16,"../property":13}],11:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.Formula=void 0;var s=t("./formula");Object.defineProperty(r,"Formula",{enumerable:!0,get:function(){return s.Formula}})},{"./formula":10}],12:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.Property=r.Formula=r.TrackerAttr=r.IntAttr=void 0;var s=t("./attrs"),n=(Object.defineProperty(r,"IntAttr",{enumerable:!0,get:function(){return s.IntAttr}}),Object.defineProperty(r,"TrackerAttr",{enumerable:!0,get:function(){return s.TrackerAttr}}),t("./concepts")),o=(Object.defineProperty(r,"Formula",{enumerable:!0,get:function(){return n.Formula}}),t("./property"));Object.defineProperty(r,"Property",{enumerable:!0,get:function(){return o.Property}})},{"./attrs":6,"./concepts":11,"./property":13}],13:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.Property=void 0;const s=t("../errors"),n=t("./attrs");r.Property=class{_div;constructor(){var t=document.querySelector("div#all_attributes");if(!t)throw new s.WarnNoTargetError("チケットの編集画面ではありません",document);this._div=t}div(){return this._div}tracker(){return new n.TrackerAttr(this._div)}status(){return new n.StatusAttr(this._div)}dueDate(){return new n.DueDateAttr(this._div)}intCustomFields(){var t=this._div.querySelectorAll("p:has(> .int_cf)");return Array.from(t).map(t=>new n.IntAttr(t))}}},{"../errors":3,"./attrs":6}],14:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.wait=r.handler=void 0;const s=t("./errors");r.handler=t=>{try{t()}catch(t){if(!(t instanceof s.WarnNoTargetError))throw t}};r.wait=e=>new Promise(t=>{setTimeout(t,e)})},{"./errors":3}],15:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.isIssueNew=r.isIssueShow=void 0;r.isIssueShow=()=>/^\/issues\/\d+$/.test(location.pathname);r.isIssueNew=()=>/^\/projects\/\w+\/issues\/new$/.test(location.pathname)},{}],16:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.isInteger=r.isDate=r.sanitizeWithOne=void 0;r.sanitizeWithOne=t=>{t.map(t=>{(0,r.isInteger)(t.value)||(t.value="1")})},r.isDate=t=>/^\d{4}-\d{2}-\d{2}$/.test(t);r.isInteger=t=>/^-?([1-9]\d*|0)$/.test(t)},{}]},{},[1]);