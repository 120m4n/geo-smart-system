import{i as ie}from"./core-components-BXSE5O8L.js";import{c as ae,a as se}from"./optional-components-xCqk0V7o.js";import{i as ce}from"./utils-DvkBdQn9.js";import"./maps-DQlQjAlI.js";import"./ui-BKNfdvBf.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const g of document.querySelectorAll('link[rel="modulepreload"]'))m(g);new MutationObserver(g=>{for(const f of g)if(f.type==="childList")for(const w of f.addedNodes)w.tagName==="LINK"&&w.rel==="modulepreload"&&m(w)}).observe(document,{childList:!0,subtree:!0});function d(g){const f={};return g.integrity&&(f.integrity=g.integrity),g.referrerPolicy&&(f.referrerPolicy=g.referrerPolicy),g.crossOrigin==="use-credentials"?f.credentials="include":g.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function m(g){if(g.ep)return;g.ep=!0;const f=d(g);fetch(g.href,f)}})();class le extends HTMLElement{constructor(){super(),this.shadowDOM=this.attachShadow({mode:"open"}),this.expanded=!1}connectedCallback(){this.render(),this.shadowDOM.querySelector(".toggle-button").addEventListener("click",()=>this.togglePanel()),this.shadowDOM.querySelector(".extra-button").addEventListener("click",e=>this.handleExtraButtonClick(e))}togglePanel(){this.expanded=!this.expanded,this.updatePanel()}handleExtraButtonClick(e){e.stopPropagation();const d=new CustomEvent("flushdb-click",{detail:{},bubbles:!0,composed:!0});this.dispatchEvent(d)}updatePanel(){const e=this.shadowDOM.querySelector(".content"),d=this.shadowDOM.querySelector(".extra-button");this.expanded?(e.style.transform="translateY(0)",e.style.height="80vh",d.style.display="block"):(e.style.transform="translateY(calc(100% - 3px))",e.style.height="0px",d.style.display="none")}render(){this.shadowDOM.innerHTML=`
            ${this.templateCss()}
            ${this.template()}
        `,this.updatePanel()}template(){return`
        <div class="panel">
            <div class="header">
                <button class="toggle-button">Avatares</button>
                <button class="extra-button" style="display:none;"></button>
            </div>
            <div class="content">
                <slot></slot>
            </div>
        </div>
    `}templateCss(){return`
        <style>
            .panel {
                position: fixed;
                bottom: 16px;
                right: 16px;
                max-width: 260px;
                width: 240px;
                border-radius: 10px 10px 8px 8px;
                border: 1px solid #d0d0d0;
                box-shadow: 0 4px 16px rgba(0,0,0,0.08);
                background: #fff;
                transform-origin: bottom;
                overflow: hidden;
                z-index: 1000;
            }
            .header {
                display: flex;
                flex-direction: row;
                align-items: center;
                width: 100%;
            }
            .toggle-button {
                flex: 1 1 auto;
                background-color: #1976d2;
                color: #fff;
                border: none;
                padding: 0 10px;
                height: 48px;
                font-size: 1rem;
                font-weight: 500;
                border-radius: 10px 0 0 0;
                cursor: pointer;
                transition: background 0.2s;
                text-align: left;
            }
            .toggle-button:hover {
                background-color: #1565c0;
            }
            .extra-button {
                flex: 0 0 auto;
                background-color: #fff;
                color: #1976d2;
                border: none;
                height: 24px;
                width: 24px;
                margin: 0 6px 0 6px;
                border-radius: 0 10px 0 0;
                cursor: pointer;
                transition: background 0.2s, color 0.2s;
                background-image: url('assets/icons8-basura-24.png');
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }
            .extra-button:hover {
                background-color: #e3eafc;
                color: #1565c0;
            }
            .content {
                background: #fafbfc;
                border-radius: 0 0 8px 8px;
                box-shadow: 0 1px 4px rgba(0,0,0,0.03);
                transform: translateY(calc(100% - 48px));
                overflow-y: auto;
                transition: transform 1s, height 1s;
                padding: 10px 8px 8px 8px;
                min-height: 0;
                max-height: 70vh;
            }
            
            /* Dispositivos móviles pequeños (iPhone SE: 375px) */
            @media (max-width: 414px) {
                .panel {
                    right: 8px;
                    bottom: 8px;
                    width: 280px;
                    max-width: calc(100vw - 16px);
                }
                .content {
                    max-height: 60vh;
                    padding: 8px 6px 6px 6px;
                }
                .toggle-button {
                    font-size: 0.9rem;
                    padding: 0 8px;
                    height: 44px;
                }
                .extra-button {
                    height: 22px;
                    width: 22px;
                    margin: 0 4px 0 4px;
                }
            }
            
            /* iPhone SE específico (375px) */
            @media (max-width: 375px) {
                .panel {
                    right: 6px;
                    bottom: 6px;
                    width: 260px;
                    max-width: calc(100vw - 12px);
                }
                .content {
                    max-height: 55vh;
                    padding: 6px 5px 5px 5px;
                }
                .toggle-button {
                    font-size: 0.85rem;
                    padding: 0 6px;
                    height: 42px;
                }
            }
            
            /* Dispositivos muy pequeños */
            @media (max-width: 320px) {
                .panel {
                    right: 4px;
                    bottom: 4px;
                    width: 240px;
                    max-width: calc(100vw - 8px);
                }
                .content {
                    max-height: 50vh;
                    padding: 6px 4px 4px 4px;
                }
                .toggle-button {
                    font-size: 0.8rem;
                    padding: 0 5px;
                    height: 40px;
                }
                .extra-button {
                    height: 20px;
                    width: 20px;
                    margin: 0 3px 0 3px;
                }
            }
        </style>
    `}}customElements.define("side-panel",le);class de extends HTMLElement{constructor(){super(),this.shadowDOM=this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.shadowDOM.querySelector(".image").addEventListener("click",()=>this.handleImageClick()),this.shadowDOM.querySelector(".btn_clear").addEventListener("click",()=>this.handleBtnClearClick()),this.shadowDOM.querySelector(".btn_history").addEventListener("click",()=>this.handleBtnHistoryClick())}handleBtnClearClick(){const e=this.getAttribute("id"),d=new CustomEvent("clear-click",{detail:{id:e},bubbles:!0,composed:!0});this.dispatchEvent(d)}handleImageClick(){const e=this.getAttribute("id"),d=new CustomEvent("avatar-click",{detail:{id:e},bubbles:!0,composed:!0});this.dispatchEvent(d)}handleBtnHistoryClick(){const e=this.getAttribute("id"),d=new CustomEvent("avatar-history-click",{detail:{id:e},bubbles:!0,composed:!0});this.dispatchEvent(d)}render(){this.shadowDOM.innerHTML=`
            ${this.templateCss()}
            ${this.template()}
        `}template(){return`
            <div class="container">
                <img src="${this.getAttribute("img-src")||""}" alt="Image" class="image" onerror="this.onerror=null;this.src='assets/hacker.png';">
                <div class="content">
                    <span class="title">${this.getAttribute("title")||"Title"}</span>
                    <span class="subtitle">${this.getAttribute("subtitle")||"Subtitle"}</span>
                </div>
                <div class="controls">
                    <div class="btn_history" title="Ver historial"></div>
                    <div class="btn_clear"></div>
                </div>
            </div>
        `}templateCss(){return`
            <style>
                .container {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    height: 53px;
                    min-width: 0;
                    box-sizing: border-box;
                    padding-left: 3px;
                    padding-right: 3px;
                    border-bottom: 1px solid #aaa;
                    background-color: #f9f9f9;
                }
                .image {
                    width: 47px;
                    height: 47px;
                    object-fit: cover;
                    cursor: pointer;
                    border-radius: 4px;
                    flex-shrink: 0;
                }
                .content {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding-left: 10px;
                    flex-grow: 1;
                    min-width: 0;
                    overflow: hidden;
                }
                .title {
                    font-weight: bold;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 140px;
                    display: block;
                    font-size: 0.9rem;
                    line-height: 1.2;
                }
                .subtitle {
                    color: grey;
                    font-size: 0.8rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 140px;
                }
                .controls {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-end;
                    width: 50px;
                    height: 100%;
                    box-sizing: border-box;
                    padding-top: 2px;
                    gap: 4px;
                    flex-shrink: 0;
                }
                .btn_clear {
                    background: none;
                    cursor: pointer;
                    padding: 0;
                    width: 24px;
                    height: 24px;
                    background-image: url('assets/icons8-close-24.png');
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    border: none;
                    outline: none;
                    transition: opacity 0.2s ease;
                }
                .btn_clear:hover {
                    opacity: 0.7;
                }
                .btn_clear:active {
                    opacity: 0.5;
                }
                .btn_history {
                    background: none;
                    cursor: pointer;
                    padding: 0;
                    width: 22px;
                    height: 22px;
                    background-image: url('assets/icons8-ruta-50.png');
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    border: none;
                    outline: none;
                    transition: opacity 0.2s ease;
                }
                .btn_history:hover {
                    opacity: 0.7;
                }
                .btn_history:active {
                    opacity: 0.5;
                }
                
                /* Dispositivos móviles pequeños (iPhone SE: 375px) */
                @media (max-width: 414px) {
                    .container {
                        height: 50px;
                        padding-left: 2px;
                        padding-right: 2px;
                    }
                    .image {
                        width: 42px;
                        height: 42px;
                    }
                    .content {
                        padding-left: 8px;
                    }
                    .title {
                        font-size: 0.85rem;
                        max-width: 120px;
                    }
                    .subtitle {
                        font-size: 0.75rem;
                        max-width: 120px;
                    }
                    .controls {
                        width: 45px;
                        gap: 3px;
                    }
                    .btn_clear {
                        width: 22px;
                        height: 22px;
                    }
                    .btn_history {
                        width: 20px;
                        height: 20px;
                    }
                }
                
                /* iPhone SE específico (375px) */
                @media (max-width: 375px) {
                    .container {
                        height: 48px;
                        padding-left: 2px;
                        padding-right: 2px;
                    }
                    .image {
                        width: 40px;
                        height: 40px;
                    }
                    .content {
                        padding-left: 6px;
                    }
                    .title {
                        font-size: 0.8rem;
                        max-width: 110px;
                    }
                    .subtitle {
                        font-size: 0.7rem;
                        max-width: 110px;
                    }
                    .controls {
                        width: 42px;
                        gap: 2px;
                    }
                    .btn_clear {
                        width: 20px;
                        height: 20px;
                    }
                    .btn_history {
                        width: 18px;
                        height: 18px;
                    }
                }
                
                /* Dispositivos muy pequeños */
                @media (max-width: 320px) {
                    .container {
                        height: 46px;
                        padding-left: 1px;
                        padding-right: 1px;
                    }
                    .image {
                        width: 38px;
                        height: 38px;
                    }
                    .content {
                        padding-left: 5px;
                    }
                    .title {
                        font-size: 0.75rem;
                        max-width: 100px;
                    }
                    .subtitle {
                        font-size: 0.65rem;
                        max-width: 100px;
                    }
                    .controls {
                        width: 38px;
                        gap: 2px;
                    }
                    .btn_clear {
                        width: 18px;
                        height: 18px;
                    }
                    .btn_history {
                        width: 16px;
                        height: 16px;
                    }
                }
                
                /* Mejoras de accesibilidad táctil para móviles */
                @media (max-width: 768px) {
                    .btn_clear,
                    .btn_history {
                        min-width: 24px;
                        min-height: 24px;
                        position: relative;
                    }
                    
                    /* Área táctil más grande sin cambiar el diseño visual */
                    .btn_clear::before,
                    .btn_history::before {
                        content: '';
                        position: absolute;
                        top: -4px;
                        left: -4px;
                        right: -4px;
                        bottom: -4px;
                    }
                    
                    .image {
                        transition: transform 0.1s ease;
                    }
                    
                    .image:active {
                        transform: scale(0.95);
                    }
                }
            </style>
        `}static get observedAttributes(){return["img-src","title","subtitle","id"]}attributeChangedCallback(e,d,m){d!==m&&this.render()}}customElements.define("avatar-component",de);function $(u){if(!(this instanceof $))throw new Error("The 'Keycloak' constructor must be invoked with 'new'.");if(typeof u!="string"&&!H(u))throw new Error("The 'Keycloak' constructor must be provided with a configuration object, or a URL to a JSON configuration file.");if(H(u)){const t="oidcProvider"in u?["clientId"]:["url","realm","clientId"];for(const r of t)if(!u[r])throw new Error(`The configuration object is missing the required '${r}' property.`)}var e=this,d,m=[],g,f={enable:!0,callbackList:[],interval:5};e.didInitialize=!1;var w=!0,E=V(console.info),L=V(console.warn);globalThis.isSecureContext||L(`[KEYCLOAK] Keycloak JS must be used in a 'secure context' to function properly as it relies on browser APIs that are otherwise not available.
Continuing to run your application insecurely will lead to unexpected behavior and breakage.

For more information see: https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts`),e.init=function(t={}){if(e.didInitialize)throw new Error("A 'Keycloak' instance can only be initialized once.");e.didInitialize=!0,e.authenticated=!1,g=oe();var r=["default","cordova","cordova-native"];if(r.indexOf(t.adapter)>-1?d=P(t.adapter):typeof t.adapter=="object"?d=t.adapter:window.Cordova||window.cordova?d=P("cordova"):d=P(),typeof t.useNonce<"u"&&(w=t.useNonce),typeof t.checkLoginIframe<"u"&&(f.enable=t.checkLoginIframe),t.checkLoginIframeInterval&&(f.interval=t.checkLoginIframeInterval),t.onLoad==="login-required"&&(e.loginRequired=!0),t.responseMode)if(t.responseMode==="query"||t.responseMode==="fragment")e.responseMode=t.responseMode;else throw"Invalid value for responseMode";if(t.flow){switch(t.flow){case"standard":e.responseType="code";break;case"implicit":e.responseType="id_token token";break;case"hybrid":e.responseType="code id_token token";break;default:throw"Invalid value for flow"}e.flow=t.flow}if(t.timeSkew!=null&&(e.timeSkew=t.timeSkew),t.redirectUri&&(e.redirectUri=t.redirectUri),t.silentCheckSsoRedirectUri&&(e.silentCheckSsoRedirectUri=t.silentCheckSsoRedirectUri),typeof t.silentCheckSsoFallback=="boolean"?e.silentCheckSsoFallback=t.silentCheckSsoFallback:e.silentCheckSsoFallback=!0,typeof t.pkceMethod<"u"){if(t.pkceMethod!=="S256"&&t.pkceMethod!==!1)throw new TypeError(`Invalid value for pkceMethod', expected 'S256' or false but got ${t.pkceMethod}.`);e.pkceMethod=t.pkceMethod}else e.pkceMethod="S256";typeof t.enableLogging=="boolean"?e.enableLogging=t.enableLogging:e.enableLogging=!1,t.logoutMethod==="POST"?e.logoutMethod="POST":e.logoutMethod="GET",typeof t.scope=="string"&&(e.scope=t.scope),typeof t.acrValues=="string"&&(e.acrValues=t.acrValues),typeof t.messageReceiveTimeout=="number"&&t.messageReceiveTimeout>0?e.messageReceiveTimeout=t.messageReceiveTimeout:e.messageReceiveTimeout=1e4,e.responseMode||(e.responseMode="fragment"),e.responseType||(e.responseType="code",e.flow="standard");var s=v(),a=v();a.promise.then(function(){e.onReady&&e.onReady(e.authenticated),s.setSuccess(e.authenticated)}).catch(function(o){s.setError(o)});var i=ee();function c(){var o=function(p){p||(h.prompt="none"),t.locale&&(h.locale=t.locale),e.login(h).then(function(){a.setSuccess()}).catch(function(k){a.setError(k)})},l=async function(){var p=document.createElement("iframe"),k=await e.createLoginUrl({prompt:"none",redirectUri:e.silentCheckSsoRedirectUri});p.setAttribute("src",k),p.setAttribute("sandbox","allow-storage-access-by-user-activation allow-scripts allow-same-origin"),p.setAttribute("title","keycloak-silent-check-sso"),p.style.display="none",document.body.appendChild(p);var b=function(S){if(!(S.origin!==window.location.origin||p.contentWindow!==S.source)){var y=C(S.data);_(y,a),document.body.removeChild(p),window.removeEventListener("message",b)}};window.addEventListener("message",b)},h={};switch(t.onLoad){case"check-sso":f.enable?R().then(function(){I().then(function(p){p?a.setSuccess():e.silentCheckSsoRedirectUri?l():o(!1)}).catch(function(p){a.setError(p)})}):e.silentCheckSsoRedirectUri?l():o(!1);break;case"login-required":o(!0);break;default:throw"Invalid value for onLoad"}}function n(){var o=C(window.location.href);if(o&&window.history.replaceState(window.history.state,null,o.newUrl),o&&o.valid)return R().then(function(){_(o,a)}).catch(function(l){a.setError(l)});t.token&&t.refreshToken?(A(t.token,t.refreshToken,t.idToken),f.enable?R().then(function(){I().then(function(l){l?(e.onAuthSuccess&&e.onAuthSuccess(),a.setSuccess(),M()):a.setSuccess()}).catch(function(l){a.setError(l)})}):e.updateToken(-1).then(function(){e.onAuthSuccess&&e.onAuthSuccess(),a.setSuccess()}).catch(function(l){e.onAuthError&&e.onAuthError(),t.onLoad?c():a.setError(l)})):t.onLoad?c():a.setSuccess()}return i.then(function(){ne().then(n).catch(function(o){s.setError(o)})}),i.catch(function(o){s.setError(o)}),s.promise},e.login=function(t){return d.login(t)};function F(t){if(typeof crypto>"u"||typeof crypto.getRandomValues>"u")throw new Error("Web Crypto API is not available.");return crypto.getRandomValues(new Uint8Array(t))}function G(t){return X(t,"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")}function X(t,r){for(var s=F(t),a=new Array(t),i=0;i<t;i++)a[i]=r.charCodeAt(s[i]%r.length);return String.fromCharCode.apply(null,a)}async function W(t,r){if(t!=="S256")throw new TypeError(`Invalid value for 'pkceMethod', expected 'S256' but got '${t}'.`);const s=new Uint8Array(await fe(r));return ue(s).replace(/\+/g,"-").replace(/\//g,"_").replace(/\=/g,"")}function Q(t){var r={id_token:{acr:t}};return JSON.stringify(r)}e.createLoginUrl=async function(t){var r=q(),s=q(),a=d.redirectUri(t),i={state:r,nonce:s,redirectUri:encodeURIComponent(a),loginOptions:t};t&&t.prompt&&(i.prompt=t.prompt);var c;t&&t.action=="register"?c=e.endpoints.register():c=e.endpoints.authorize();var n=t&&t.scope||e.scope;n?n.indexOf("openid")===-1&&(n="openid "+n):n="openid";var o=c+"?client_id="+encodeURIComponent(e.clientId)+"&redirect_uri="+encodeURIComponent(a)+"&state="+encodeURIComponent(r)+"&response_mode="+encodeURIComponent(e.responseMode)+"&response_type="+encodeURIComponent(e.responseType)+"&scope="+encodeURIComponent(n);if(w&&(o=o+"&nonce="+encodeURIComponent(s)),t&&t.prompt&&(o+="&prompt="+encodeURIComponent(t.prompt)),t&&typeof t.maxAge=="number"&&(o+="&max_age="+encodeURIComponent(t.maxAge)),t&&t.loginHint&&(o+="&login_hint="+encodeURIComponent(t.loginHint)),t&&t.idpHint&&(o+="&kc_idp_hint="+encodeURIComponent(t.idpHint)),t&&t.action&&t.action!="register"&&(o+="&kc_action="+encodeURIComponent(t.action)),t&&t.locale&&(o+="&ui_locales="+encodeURIComponent(t.locale)),t&&t.acr){var l=Q(t.acr);o+="&claims="+encodeURIComponent(l)}if((t&&t.acrValues||e.acrValues)&&(o+="&acr_values="+encodeURIComponent(t.acrValues||e.acrValues)),e.pkceMethod)try{const h=G(96),p=await W(e.pkceMethod,h);i.pkceCodeVerifier=h,o+="&code_challenge="+p,o+="&code_challenge_method="+e.pkceMethod}catch(h){throw new Error("Failed to generate PKCE challenge.",{cause:h})}return g.add(i),o},e.logout=function(t){return d.logout(t)},e.createLogoutUrl=function(t){if(((t==null?void 0:t.logoutMethod)??e.logoutMethod)==="POST")return e.endpoints.logout();var s=e.endpoints.logout()+"?client_id="+encodeURIComponent(e.clientId)+"&post_logout_redirect_uri="+encodeURIComponent(d.redirectUri(t,!1));return e.idToken&&(s+="&id_token_hint="+encodeURIComponent(e.idToken)),s},e.register=function(t){return d.register(t)},e.createRegisterUrl=async function(t){return t||(t={}),t.action="register",await e.createLoginUrl(t)},e.createAccountUrl=function(t){var r=x(),s=void 0;return typeof r<"u"&&(s=r+"/account?referrer="+encodeURIComponent(e.clientId)+"&referrer_uri="+encodeURIComponent(d.redirectUri(t))),s},e.accountManagement=function(){return d.accountManagement()},e.hasRealmRole=function(t){var r=e.realmAccess;return!!r&&r.roles.indexOf(t)>=0},e.hasResourceRole=function(t,r){if(!e.resourceAccess)return!1;var s=e.resourceAccess[r||e.clientId];return!!s&&s.roles.indexOf(t)>=0},e.loadUserProfile=function(){var t=x()+"/account",r=new XMLHttpRequest;r.open("GET",t,!0),r.setRequestHeader("Accept","application/json"),r.setRequestHeader("Authorization","bearer "+e.token);var s=v();return r.onreadystatechange=function(){r.readyState==4&&(r.status==200?(e.profile=JSON.parse(r.responseText),s.setSuccess(e.profile)):s.setError())},r.send(),s.promise},e.loadUserInfo=function(){var t=e.endpoints.userinfo(),r=new XMLHttpRequest;r.open("GET",t,!0),r.setRequestHeader("Accept","application/json"),r.setRequestHeader("Authorization","bearer "+e.token);var s=v();return r.onreadystatechange=function(){r.readyState==4&&(r.status==200?(e.userInfo=JSON.parse(r.responseText),s.setSuccess(e.userInfo)):s.setError())},r.send(),s.promise},e.isTokenExpired=function(t){if(!e.tokenParsed||!e.refreshToken&&e.flow!="implicit")throw"Not authenticated";if(e.timeSkew==null)return E("[KEYCLOAK] Unable to determine if token is expired as timeskew is not set"),!0;var r=e.tokenParsed.exp-Math.ceil(new Date().getTime()/1e3)+e.timeSkew;if(t){if(isNaN(t))throw"Invalid minValidity";r-=t}return r<0},e.updateToken=function(t){var r=v();if(!e.refreshToken)return r.setError(),r.promise;t=t||5;var s=function(){var i=!1;if(t==-1?(i=!0,E("[KEYCLOAK] Refreshing token: forced refresh")):(!e.tokenParsed||e.isTokenExpired(t))&&(i=!0,E("[KEYCLOAK] Refreshing token: token expired")),!i)r.setSuccess(!1);else{var c="grant_type=refresh_token&refresh_token="+e.refreshToken,n=e.endpoints.token();if(m.push(r),m.length==1){var o=new XMLHttpRequest;o.open("POST",n,!0),o.setRequestHeader("Content-type","application/x-www-form-urlencoded"),o.withCredentials=!0,c+="&client_id="+encodeURIComponent(e.clientId);var l=new Date().getTime();o.onreadystatechange=function(){if(o.readyState==4)if(o.status==200){E("[KEYCLOAK] Token refreshed"),l=(l+new Date().getTime())/2;var h=JSON.parse(o.responseText);A(h.access_token,h.refresh_token,h.id_token,l),e.onAuthRefreshSuccess&&e.onAuthRefreshSuccess();for(var p=m.pop();p!=null;p=m.pop())p.setSuccess(!0)}else{L("[KEYCLOAK] Failed to refresh token"),o.status==400&&e.clearToken(),e.onAuthRefreshError&&e.onAuthRefreshError();for(var p=m.pop();p!=null;p=m.pop())p.setError("Failed to refresh token: An unexpected HTTP error occurred while attempting to refresh the token.")}},o.send(c)}}};if(f.enable){var a=I();a.then(function(){s()}).catch(function(i){r.setError(i)})}else s();return r.promise},e.clearToken=function(){e.token&&(A(null,null,null),e.onAuthLogout&&e.onAuthLogout(),e.loginRequired&&e.login())};function x(){if(typeof e.authServerUrl<"u")return e.authServerUrl.charAt(e.authServerUrl.length-1)=="/"?e.authServerUrl+"realms/"+encodeURIComponent(e.realm):e.authServerUrl+"/realms/"+encodeURIComponent(e.realm)}function Z(){return window.location.origin?window.location.origin:window.location.protocol+"//"+window.location.hostname+(window.location.port?":"+window.location.port:"")}function _(t,r){var s=t.code,a=t.error,i=t.prompt,c=new Date().getTime();if(t.kc_action_status&&e.onActionUpdate&&e.onActionUpdate(t.kc_action_status,t.kc_action),a){if(i!="none")if(t.error_description&&t.error_description==="authentication_expired")e.login(t.loginOptions);else{var n={error:a,error_description:t.error_description};e.onAuthError&&e.onAuthError(n),r&&r.setError(n)}else r&&r.setSuccess();return}else e.flow!="standard"&&(t.access_token||t.id_token)&&p(t.access_token,null,t.id_token,!0);if(e.flow!="implicit"&&s){var o="code="+s+"&grant_type=authorization_code",l=e.endpoints.token(),h=new XMLHttpRequest;h.open("POST",l,!0),h.setRequestHeader("Content-type","application/x-www-form-urlencoded"),o+="&client_id="+encodeURIComponent(e.clientId),o+="&redirect_uri="+t.redirectUri,t.pkceCodeVerifier&&(o+="&code_verifier="+t.pkceCodeVerifier),h.withCredentials=!0,h.onreadystatechange=function(){if(h.readyState==4)if(h.status==200){var k=JSON.parse(h.responseText);p(k.access_token,k.refresh_token,k.id_token,e.flow==="standard"),M()}else e.onAuthError&&e.onAuthError(),r&&r.setError()},h.send(o)}function p(k,b,S,y){c=(c+new Date().getTime())/2,A(k,b,S,c),w&&e.idTokenParsed&&e.idTokenParsed.nonce!=t.storedNonce?(E("[KEYCLOAK] Invalid nonce, clearing token"),e.clearToken(),r&&r.setError()):y&&(e.onAuthSuccess&&e.onAuthSuccess(),r&&r.setSuccess())}}function ee(){var t=v(),r;typeof u=="string"&&(r=u);function s(n){n?e.endpoints={authorize:function(){return n.authorization_endpoint},token:function(){return n.token_endpoint},logout:function(){if(!n.end_session_endpoint)throw"Not supported by the OIDC server";return n.end_session_endpoint},checkSessionIframe:function(){if(!n.check_session_iframe)throw"Not supported by the OIDC server";return n.check_session_iframe},register:function(){throw'Redirection to "Register user" page not supported in standard OIDC mode'},userinfo:function(){if(!n.userinfo_endpoint)throw"Not supported by the OIDC server";return n.userinfo_endpoint}}:e.endpoints={authorize:function(){return x()+"/protocol/openid-connect/auth"},token:function(){return x()+"/protocol/openid-connect/token"},logout:function(){return x()+"/protocol/openid-connect/logout"},checkSessionIframe:function(){return x()+"/protocol/openid-connect/login-status-iframe.html"},thirdPartyCookiesIframe:function(){return x()+"/protocol/openid-connect/3p-cookies/step1.html"},register:function(){return x()+"/protocol/openid-connect/registrations"},userinfo:function(){return x()+"/protocol/openid-connect/userinfo"}}}if(r){var a=new XMLHttpRequest;a.open("GET",r,!0),a.setRequestHeader("Accept","application/json"),a.onreadystatechange=function(){if(a.readyState==4)if(a.status==200||N(a)){var n=JSON.parse(a.responseText);e.authServerUrl=n["auth-server-url"],e.realm=n.realm,e.clientId=n.resource,s(null),t.setSuccess()}else t.setError()},a.send()}else{e.clientId=u.clientId;var i=u.oidcProvider;if(!i)e.authServerUrl=u.url,e.realm=u.realm,s(null),t.setSuccess();else if(typeof i=="string"){var c;i.charAt(i.length-1)=="/"?c=i+".well-known/openid-configuration":c=i+"/.well-known/openid-configuration";var a=new XMLHttpRequest;a.open("GET",c,!0),a.setRequestHeader("Accept","application/json"),a.onreadystatechange=function(){if(a.readyState==4)if(a.status==200||N(a)){var o=JSON.parse(a.responseText);s(o),t.setSuccess()}else t.setError()},a.send()}else s(i),t.setSuccess()}return t.promise}function N(t){return t.status==0&&t.responseText&&t.responseURL.startsWith("file:")}function A(t,r,s,a){if(e.tokenTimeoutHandle&&(clearTimeout(e.tokenTimeoutHandle),e.tokenTimeoutHandle=null),r?(e.refreshToken=r,e.refreshTokenParsed=K(r)):(delete e.refreshToken,delete e.refreshTokenParsed),s?(e.idToken=s,e.idTokenParsed=K(s)):(delete e.idToken,delete e.idTokenParsed),t){if(e.token=t,e.tokenParsed=K(t),e.sessionId=e.tokenParsed.sid,e.authenticated=!0,e.subject=e.tokenParsed.sub,e.realmAccess=e.tokenParsed.realm_access,e.resourceAccess=e.tokenParsed.resource_access,a&&(e.timeSkew=Math.floor(a/1e3)-e.tokenParsed.iat),e.timeSkew!=null&&(E("[KEYCLOAK] Estimated time difference between browser and server is "+e.timeSkew+" seconds"),e.onTokenExpired)){var i=(e.tokenParsed.exp-new Date().getTime()/1e3+e.timeSkew)*1e3;E("[KEYCLOAK] Token expires in "+Math.round(i/1e3)+" s"),i<=0?e.onTokenExpired():e.tokenTimeoutHandle=setTimeout(e.onTokenExpired,i)}}else delete e.token,delete e.tokenParsed,delete e.subject,delete e.realmAccess,delete e.resourceAccess,e.authenticated=!1}function q(){if(typeof crypto>"u"||typeof crypto.randomUUID>"u")throw new Error("Web Crypto API is not available.");return crypto.randomUUID()}function C(t){var r=te(t);if(r){var s=g.get(r.state);return s&&(r.valid=!0,r.redirectUri=s.redirectUri,r.storedNonce=s.nonce,r.prompt=s.prompt,r.pkceCodeVerifier=s.pkceCodeVerifier,r.loginOptions=s.loginOptions),r}}function te(t){var r;switch(e.flow){case"standard":r=["code","state","session_state","kc_action_status","kc_action","iss"];break;case"implicit":r=["access_token","token_type","id_token","state","session_state","expires_in","kc_action_status","kc_action","iss"];break;case"hybrid":r=["access_token","token_type","id_token","code","state","session_state","expires_in","kc_action_status","kc_action","iss"];break}r.push("error"),r.push("error_description"),r.push("error_uri");var s=t.indexOf("?"),a=t.indexOf("#"),i,c;if(e.responseMode==="query"&&s!==-1?(i=t.substring(0,s),c=j(t.substring(s+1,a!==-1?a:t.length),r),c.paramsString!==""&&(i+="?"+c.paramsString),a!==-1&&(i+=t.substring(a))):e.responseMode==="fragment"&&a!==-1&&(i=t.substring(0,a),c=j(t.substring(a+1),r),c.paramsString!==""&&(i+="#"+c.paramsString)),c&&c.oauthParams){if(e.flow==="standard"||e.flow==="hybrid"){if((c.oauthParams.code||c.oauthParams.error)&&c.oauthParams.state)return c.oauthParams.newUrl=i,c.oauthParams}else if(e.flow==="implicit"&&(c.oauthParams.access_token||c.oauthParams.error)&&c.oauthParams.state)return c.oauthParams.newUrl=i,c.oauthParams}}function j(t,r){for(var s=t.split("&"),a={paramsString:"",oauthParams:{}},i=0;i<s.length;i++){var c=s[i].indexOf("="),n=s[i].slice(0,c);r.indexOf(n)!==-1?a.oauthParams[n]=s[i].slice(c+1):(a.paramsString!==""&&(a.paramsString+="&"),a.paramsString+=s[i])}return a}function v(){var t={setSuccess:function(r){t.resolve(r)},setError:function(r){t.reject(r)}};return t.promise=new Promise(function(r,s){t.resolve=r,t.reject=s}),t}function re(t,r,s){var a=null,i=new Promise(function(c,n){a=setTimeout(function(){n({error:s})},r)});return Promise.race([t,i]).finally(function(){clearTimeout(a)})}function R(){var t=v();if(!f.enable||f.iframe)return t.setSuccess(),t.promise;var r=document.createElement("iframe");f.iframe=r,r.onload=function(){var i=e.endpoints.authorize();i.charAt(0)==="/"?f.iframeOrigin=Z():f.iframeOrigin=i.substring(0,i.indexOf("/",8)),t.setSuccess()};var s=e.endpoints.checkSessionIframe();r.setAttribute("src",s),r.setAttribute("sandbox","allow-storage-access-by-user-activation allow-scripts allow-same-origin"),r.setAttribute("title","keycloak-session-iframe"),r.style.display="none",document.body.appendChild(r);var a=function(i){if(!(i.origin!==f.iframeOrigin||f.iframe.contentWindow!==i.source)&&(i.data=="unchanged"||i.data=="changed"||i.data=="error")){i.data!="unchanged"&&e.clearToken();for(var c=f.callbackList.splice(0,f.callbackList.length),n=c.length-1;n>=0;--n){var o=c[n];i.data=="error"?o.setError():o.setSuccess(i.data=="unchanged")}}};return window.addEventListener("message",a,!1),t.promise}function M(){f.enable&&e.token&&setTimeout(function(){I().then(function(t){t&&M()})},f.interval*1e3)}function I(){var t=v();if(f.iframe&&f.iframeOrigin){var r=e.clientId+" "+(e.sessionId?e.sessionId:"");f.callbackList.push(t);var s=f.iframeOrigin;f.callbackList.length==1&&f.iframe.contentWindow.postMessage(r,s)}else t.setSuccess();return t.promise}function ne(){var t=v();if((f.enable||e.silentCheckSsoRedirectUri)&&typeof e.endpoints.thirdPartyCookiesIframe=="function"){var r=document.createElement("iframe");r.setAttribute("src",e.endpoints.thirdPartyCookiesIframe()),r.setAttribute("sandbox","allow-storage-access-by-user-activation allow-scripts allow-same-origin"),r.setAttribute("title","keycloak-3p-check-iframe"),r.style.display="none",document.body.appendChild(r);var s=function(a){r.contentWindow===a.source&&(a.data!=="supported"&&a.data!=="unsupported"||(a.data==="unsupported"&&(L(`[KEYCLOAK] Your browser is blocking access to 3rd-party cookies, this means:

 - It is not possible to retrieve tokens without redirecting to the Keycloak server (a.k.a. no support for silent authentication).
 - It is not possible to automatically detect changes to the session status (such as the user logging out in another tab).

For more information see: https://www.keycloak.org/securing-apps/javascript-adapter#_modern_browsers`),f.enable=!1,e.silentCheckSsoFallback&&(e.silentCheckSsoRedirectUri=!1)),document.body.removeChild(r),window.removeEventListener("message",s),t.setSuccess()))};window.addEventListener("message",s,!1)}else t.setSuccess();return re(t.promise,e.messageReceiveTimeout,"Timeout when waiting for 3rd party check iframe message.")}function P(t){if(!t||t=="default")return{login:async function(n){return window.location.assign(await e.createLoginUrl(n)),v().promise},logout:async function(n){if(((n==null?void 0:n.logoutMethod)??e.logoutMethod)==="GET"){window.location.replace(e.createLogoutUrl(n));return}const l=document.createElement("form");l.setAttribute("method","POST"),l.setAttribute("action",e.createLogoutUrl(n)),l.style.display="none";const h={id_token_hint:e.idToken,client_id:e.clientId,post_logout_redirect_uri:d.redirectUri(n,!1)};for(const[p,k]of Object.entries(h)){const b=document.createElement("input");b.setAttribute("type","hidden"),b.setAttribute("name",p),b.setAttribute("value",k),l.appendChild(b)}document.body.appendChild(l),l.submit()},register:async function(n){return window.location.assign(await e.createRegisterUrl(n)),v().promise},accountManagement:function(){var n=e.createAccountUrl();if(typeof n<"u")window.location.href=n;else throw"Not supported by the OIDC server";return v().promise},redirectUri:function(n,o){return n&&n.redirectUri?n.redirectUri:e.redirectUri?e.redirectUri:location.href}};if(t=="cordova"){f.enable=!1;var r=function(n,o,l){return window.cordova&&window.cordova.InAppBrowser?window.cordova.InAppBrowser.open(n,o,l):window.open(n,o,l)},s=function(n){return n&&n.cordovaOptions?Object.keys(n.cordovaOptions).reduce(function(o,l){return o[l]=n.cordovaOptions[l],o},{}):{}},a=function(n){return Object.keys(n).reduce(function(o,l){return o.push(l+"="+n[l]),o},[]).join(",")},i=function(n){var o=s(n);return o.location="no",n&&n.prompt=="none"&&(o.hidden="yes"),a(o)},c=function(){return e.redirectUri||"http://localhost"};return{login:async function(n){var o=v(),l=i(n),h=await e.createLoginUrl(n),p=r(h,"_blank",l),k=!1,b=!1,S=function(){b=!0,p.close()};return p.addEventListener("loadstart",function(y){if(y.url.indexOf(c())==0){var O=C(y.url);_(O,o),S(),k=!0}}),p.addEventListener("loaderror",function(y){if(!k)if(y.url.indexOf(c())==0){var O=C(y.url);_(O,o),S(),k=!0}else o.setError(),S()}),p.addEventListener("exit",function(y){b||o.setError({reason:"closed_by_user"})}),o.promise},logout:function(n){var o=v(),l=e.createLogoutUrl(n),h=r(l,"_blank","location=no,hidden=yes,clearcache=yes"),p;return h.addEventListener("loadstart",function(k){k.url.indexOf(c())==0&&h.close()}),h.addEventListener("loaderror",function(k){k.url.indexOf(c())==0||(p=!0),h.close()}),h.addEventListener("exit",function(k){p?o.setError():(e.clearToken(),o.setSuccess())}),o.promise},register:async function(n){var o=v(),l=await e.createRegisterUrl(),h=i(n),p=r(l,"_blank",h);return p.addEventListener("loadstart",function(k){if(k.url.indexOf(c())==0){p.close();var b=C(k.url);_(b,o)}}),o.promise},accountManagement:function(){var n=e.createAccountUrl();if(typeof n<"u"){var o=r(n,"_blank","location=no");o.addEventListener("loadstart",function(l){l.url.indexOf(c())==0&&o.close()})}else throw"Not supported by the OIDC server"},redirectUri:function(n){return c()}}}if(t=="cordova-native")return f.enable=!1,{login:async function(n){var o=v(),l=await e.createLoginUrl(n);return universalLinks.subscribe("keycloak",function(h){universalLinks.unsubscribe("keycloak"),window.cordova.plugins.browsertab.close();var p=C(h.url);_(p,o)}),window.cordova.plugins.browsertab.openUrl(l),o.promise},logout:function(n){var o=v(),l=e.createLogoutUrl(n);return universalLinks.subscribe("keycloak",function(h){universalLinks.unsubscribe("keycloak"),window.cordova.plugins.browsertab.close(),e.clearToken(),o.setSuccess()}),window.cordova.plugins.browsertab.openUrl(l),o.promise},register:async function(n){var o=v(),l=await e.createRegisterUrl(n);return universalLinks.subscribe("keycloak",function(h){universalLinks.unsubscribe("keycloak"),window.cordova.plugins.browsertab.close();var p=C(h.url);_(p,o)}),window.cordova.plugins.browsertab.openUrl(l),o.promise},accountManagement:function(){var n=e.createAccountUrl();if(typeof n<"u")window.cordova.plugins.browsertab.openUrl(n);else throw"Not supported by the OIDC server"},redirectUri:function(n){return n&&n.redirectUri?n.redirectUri:e.redirectUri?e.redirectUri:"http://localhost"}};throw"invalid adapter type: "+t}const U="kc-callback-";var z=function(){if(!(this instanceof z))return new z;localStorage.setItem("kc-test","test"),localStorage.removeItem("kc-test");var t=this;function r(){const c=Date.now();for(const[n,o]of a()){const l=i(o);(l===null||l<c)&&localStorage.removeItem(n)}}function s(){for(const[c]of a())localStorage.removeItem(c)}function a(){return Object.entries(localStorage).filter(([c])=>c.startsWith(U))}function i(c){let n;try{n=JSON.parse(c)}catch{return null}return H(n)&&"expires"in n&&typeof n.expires=="number"?n.expires:null}t.get=function(c){if(c){var n=U+c,o=localStorage.getItem(n);return o&&(localStorage.removeItem(n),o=JSON.parse(o)),r(),o}},t.add=function(c){r();const n=U+c.state,o=JSON.stringify({...c,expires:Date.now()+3600*1e3});try{localStorage.setItem(n,o)}catch{s(),localStorage.setItem(n,o)}}},D=function(){if(!(this instanceof D))return new D;var t=this;t.get=function(i){if(i){var c=s(U+i);if(a(U+i,"",r(-100)),c)return JSON.parse(c)}},t.add=function(i){a(U+i.state,JSON.stringify(i),r(60))},t.removeItem=function(i){a(i,"",r(-100))};var r=function(i){var c=new Date;return c.setTime(c.getTime()+i*60*1e3),c},s=function(i){for(var c=i+"=",n=document.cookie.split(";"),o=0;o<n.length;o++){for(var l=n[o];l.charAt(0)==" ";)l=l.substring(1);if(l.indexOf(c)==0)return l.substring(c.length,l.length)}return""},a=function(i,c,n){var o=i+"="+c+"; expires="+n.toUTCString()+"; ";document.cookie=o}};function oe(){try{return new z}catch{}return new D}function V(t){return function(){e.enableLogging&&t.apply(console,Array.prototype.slice.call(arguments))}}}function ue(u){const e=String.fromCodePoint(...u);return btoa(e)}async function fe(u){const d=new TextEncoder().encode(u);if(typeof crypto>"u"||typeof crypto.subtle>"u")throw new Error("Web Crypto API is not available.");return await crypto.subtle.digest("SHA-256",d)}function K(u){const[e,d]=u.split(".");if(typeof d!="string")throw new Error("Unable to decode token, payload not found.");let m;try{m=pe(d)}catch(g){throw new Error("Unable to decode token, payload is not a valid Base64URL value.",{cause:g})}try{return JSON.parse(m)}catch(g){throw new Error("Unable to decode token, payload is not a valid JSON value.",{cause:g})}}function pe(u){let e=u.replaceAll("-","+").replaceAll("_","/");switch(e.length%4){case 0:break;case 2:e+="==";break;case 3:e+="=";break;default:throw new Error("Input is not of the correct length.")}try{return he(e)}catch{return atob(e)}}function he(u){return decodeURIComponent(atob(u).replace(/(.)/g,(e,d)=>{let m=d.charCodeAt(0).toString(16).toUpperCase();return m.length<2&&(m="0"+m),"%"+m}))}function H(u){return typeof u=="object"&&u!==null}const ge=()=>{const u="https://energis-keycloak.electrosoftware.net",e="supervision",d="cliente_geofences",m="production",f={url:u,realm:e,clientId:d,skipAuth:!1};return console.log("=== KEYCLOAK CONFIGURATION DEBUG ==="),console.log("Keycloak Config:",f),console.log("Environment Mode:",m),console.log("Skip Auth:",!1),console.log("Environment Variables Available:",{VITE_KEYCLOAK_URL:"https://energis-keycloak.electrosoftware.net",VITE_KEYCLOAK_REALM:"supervision",VITE_KEYCLOAK_CLIENT_ID:"cliente_geofences",VITE_SKIP_AUTH:void 0}),console.log("Full Config Object for Keycloak:",{url:f.url,realm:f.realm,clientId:f.clientId}),console.log("=========================================="),f},B=ge();class me{constructor(){this.keycloak=null,this.authenticated=!1,this.initialized=!1,this.skipAuth=B.skipAuth||!1}async init(){try{if(this.initialized)return console.log("AuthService ya inicializado"),this.authenticated;if(this.skipAuth)return console.log("🚧 DESARROLLO: Omitiendo autenticación"),this.authenticated=!0,this.initialized=!0,!0;this._clearProblematicState(),this.keycloak=new $(B),console.log("Iniciando Keycloak con configuración segura...");const e=await this.keycloak.init({onLoad:"check-sso",checkLoginIframe:!1,silentCheckSsoRedirectUri:void 0,enableLogging:!1,flow:"standard",responseMode:"query",pkceMethod:"S256"});return this.authenticated=e,this.initialized=!0,e?(console.log("✅ Usuario autenticado"),this._setupTokenRefresh()):console.log("ℹ️ Usuario no autenticado"),e}catch(e){return console.error("Error en AuthService.init:",e),this._handleInitError(e)}}_clearProblematicState(){try{["kc-callback","keycloak-token","keycloak-refresh-token"].forEach(d=>{localStorage.removeItem(d),sessionStorage.removeItem(d)})}catch{}}_handleInitError(e){var m;const d=e.toString().toLowerCase();return d.includes("already initialized")?(console.log("⚠️ Keycloak ya inicializado, recuperando estado..."),this.initialized=!0,this.authenticated=((m=this.keycloak)==null?void 0:m.authenticated)||!1,this.authenticated):d.includes("502")||d.includes("bad gateway")||d.includes("network")||d.includes("fetch")?(console.log("🌐 Error de conectividad, continuando sin autenticación..."),this.initialized=!0,this.authenticated=!1,!1):(console.log("⚠️ Error de autenticación, continuando en modo degradado..."),this.initialized=!0,this.authenticated=!1,!1)}_setupTokenRefresh(){this.keycloak&&(this.keycloak.onTokenExpired=()=>{console.log("Token expirado, intentando renovar..."),this.keycloak.updateToken(120).then(e=>{e&&console.log("✅ Token renovado")}).catch(e=>{console.warn("⚠️ No se pudo renovar token:",e)})})}isAuthenticated(){var e;return this.skipAuth?!0:this.authenticated&&((e=this.keycloak)==null?void 0:e.authenticated)}getToken(){var e;return this.skipAuth?"dev-mock-token":(e=this.keycloak)==null?void 0:e.token}getUserInfo(){var e;return this.skipAuth?{preferred_name:"Usuario Desarrollo",name:"Dev User",email:"dev@localhost"}:(e=this.keycloak)==null?void 0:e.tokenParsed}logout(){if(this.skipAuth){console.log("🚧 DESARROLLO: Simulando logout"),window.location.href="/";return}const e=`${window.location.origin}/logout.html`;try{this.keycloak&&this.keycloak.authenticated?this.keycloak.logout({redirectUri:e}):window.location.href="/"}catch(d){console.error("Error en logout:",d),window.location.href="/"}}login(){if(!this.skipAuth)try{this.keycloak?this.keycloak.login():window.location.reload()}catch(e){console.error("Error en login:",e),window.location.reload()}}getStatus(){var e;return{initialized:this.initialized,authenticated:this.authenticated,hasToken:this.skipAuth?!0:!!((e=this.keycloak)!=null&&e.token),skipAuth:this.skipAuth}}}const T=new me;function ke(){const u=T.getUserInfo();return`
    <div class="auth-header">
      <div class="user-info">
        <span>Bienvenido, ${(u==null?void 0:u.preferred_name)||(u==null?void 0:u.name)||"Usuario"}</span>
        <button id="logout-btn" class="logout-btn">Cerrar Sesión</button>
      </div>
    </div>
        
    <div id="map-container" tabindex="0">
        <div id="popup"></div>
        
        <!-- Elementos que van sobre el mapa -->

        
        <div class="loader" style="display: none;">
          <div class="bar1"></div>
          <div class="bar2"></div>
          <div class="bar3"></div>
          <div class="bar4"></div>
          <div class="bar5"></div>
          <div class="bar6"></div>
        </div>
    </div>
    <div class="openbtn">&raquo;</div>
    <div id="controlSidepanel" class="sidepanel">
      <div class="closebtn">&times;</div>
    </div>
  `}function ve(){return`
    <div class="loading-container">
      <div class="loading-spinner"></div>
      <p>Verificando autenticación...</p>
    </div>
  `}function be(u){return`
    <div class="error-container">
      <h2>Error de Autenticación</h2>
      <p>${u.message||"No se pudo conectar con el servidor de autenticación"}</p>
      <button id="retry-btn">Reintentar</button>
    </div>
  `}function we(){const u=document.querySelector("#logout-btn");u&&u.addEventListener("click",()=>{T.logout()});try{if((()=>{const g=document.querySelector(".openbtn"),f=document.querySelector(".closebtn"),w=document.querySelector(".sidepanel");if(!w){console.warn("Sidepanel no encontrado");return}g==null||g.addEventListener("click",()=>{w.style.width="250px"}),f==null||f.addEventListener("click",()=>{w.style.width="0"})})(),!document.querySelector("#map-container"))throw new Error("Contenedor del mapa no encontrado");const m=ie("map-container");if(!m)throw new Error("Error al crear instancia del mapa");Promise.all([Y("SSE",ae,m),Y("DragDrop",se,m)]).catch(g=>{console.error("Error inicializando componentes:",g)})}catch(e){console.error("Error crítico en setupMainApp:",e),ye(e)}ce()}function Y(u,e,d){return new Promise((m,g)=>{try{typeof e=="function"?(e(d),console.log(`Componente ${u} inicializado`),m(void 0)):g(new Error(`Componente ${u} no disponible`))}catch(f){g(new Error(`Error en componente ${u}: ${f.message}`))}})}function ye(u){const e=document.body;if(e){e.innerHTML=be(u);const d=document.getElementById("retry-btn");d&&d.addEventListener("click",()=>{location.reload()})}else alert(u.message||"Ocurrió un error inesperado.")}async function xe(){const u=document.body;try{u.innerHTML=ve(),console.log("🚀 Iniciando aplicación...");const e=await T.init();console.log("🔐 Estado de autenticación:",e),e?(console.log("✅ Usuario autenticado, cargando aplicación..."),u.innerHTML=ke(),we()):(console.log("ℹ️ Usuario no autenticado, mostrando opción de login..."),J())}catch(e){console.error("❌ Error en main:",e),J()}}function J(){const u=document.body;u.innerHTML=`
    <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      font-family: Arial, sans-serif;
      text-align: center;
      background: #f5f5f5;
    ">
      <div style="
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        max-width: 400px;
      ">
        <h2 style="color: #333; margin-bottom: 1rem;">🔐 Acceso Requerido</h2>
        <p style="color: #666; margin-bottom: 2rem;">
          Necesitas iniciar sesión para acceder a la aplicación.
        </p>
        <button id="login-btn" style="
          background: #007bff;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          margin-right: 10px;
        ">
          Iniciar Sesión
        </button>
        <button id="reload-btn" style="
          background: #6c757d;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        ">
          Recargar
        </button>
      </div>
    </div>
  `;const e=document.getElementById("login-btn"),d=document.getElementById("reload-btn");e&&e.addEventListener("click",()=>{T.login()}),d&&d.addEventListener("click",()=>{window.location.reload()})}xe().catch(u=>{console.error("Error crítico:",u),document.body.innerHTML=`
    <div style="text-align: center; padding: 2rem; font-family: Arial, sans-serif;">
      <h2>⚠️ Error de Aplicación</h2>
      <p>Ha ocurrido un error. Por favor, recarga la página.</p>
      <button onclick="window.location.reload()" style="
        background: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
      ">
        Recargar Página
      </button>
    </div>
  `});
