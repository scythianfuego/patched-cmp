// overrride v30 
! function(e) {
  var n = {};

  function t(o) {
    if (n[o]) return n[o].exports;
    var i = n[o] = {
      i: o,
      l: !1,
      exports: {}
    };
    return e[o].call(i.exports, i, i.exports, t), i.l = !0, i.exports
  }
  t.m = e, t.c = n, t.d = function(e, n, o) {
    t.o(e, n) || Object.defineProperty(e, n, {
      configurable: !1,
      enumerable: !0,
      get: o
    })
  }, t.n = function(e) {
    var n = e && e.__esModule ? function() {
      return e.default
    } : function() {
      return e
    };
    return t.d(n, "a", n), n
  }, t.o = function(e, n) {
    return Object.prototype.hasOwnProperty.call(e, n)
  }, t.p = "https://static.quantcast.mgr.consensu.org/v30/", t(t.s = 25)
}([function(e, n, t) {
  "use strict";
  Object.defineProperty(n, "__esModule", {
    value: !0
  }), n.fetchLatestGVl = n.filterVendorsByDeletedFlag = n.isUnsupportedBrowser = n.isValidUrl = n.isValidNonIabVendorListUrl = n.isValidPublisherVendorListUrl = n.isValidMarkdownLink = n.isPositiveInt = n.isNonEmptyString = n.isObjectAllFalse = n.displayPersistentConsentLink = n.isArrayAllFalse = n.isObject = n.isArray = n.doCallbackApply = n.doCallback = n.executePendingCalls = n.CallbackArray = n.logDebugMsg = n.logWarning = n.logError = n.getJson = n.MILLISEC_DAY = void 0;
  var o = t(1),
    i = function(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }(t(6));

  function s(e) {
    "@babel/helpers - typeof";
    return (s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
      return typeof e
    } : function(e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    })(e)
  }
  var a = t(12);
  n.MILLISEC_DAY = 864e5;
  n.getJson = function(e, n) {
    var t = new XMLHttpRequest;
    t.onreadystatechange = function() {
      n(t)
    }, t.open("GET", e.url), t.withCredentials = !!e.withCredentials, t.responseType = "json", t.send()
  };
  var r = function(e, n) {
    console.error(e + ": " + n + (n && n.stack ? "\n" + n.stack : ""))
  };
  n.logError = r;
  n.logWarning = function(e, n) {
    console.warn(e + ": " + n + (n && n.stack ? "\n" + n.stack : ""))
  };
  n.logDebugMsg = function(e) {};
  n.CallbackArray = function() {
    return {
      cbArray: [],
      push: function(e) {
        if ("function" != typeof e) throw "Should push only functions into Callback array. Trying to push " + s(e);
        var n = [].slice.call(arguments, 1);
        this.cbArray.push({
          func: e,
          args: n
        })
      },
      call: function() {
        for (; this.cbArray.length > 0;) {
          var e = this.cbArray.shift(),
            n = [].slice.call(arguments);
          this.asyncCall(e, n)
        }
        this.cbArray = []
      },
      asyncCall: function(e, n) {
        setTimeout(function() {
          e.func.apply(null, e.args.concat(n))
        }, 0)
      },
      size: function() {
        return this.cbArray.length
      }
    }
  };
  n.executePendingCalls = function(e) {
    for (; e.length > 0;) try {
      var n = e.shift();
      if (!n) continue;
      window.__cmp.apply(null, n)
    } catch (e) {
      r("Error running pending call", e)
    }
  };
  n.doCallback = function(e) {
    if ("function" == typeof e) return e.apply(null, [].slice.call(arguments, 1))
  };
  n.doCallbackApply = function(e, n) {
    if ("function" == typeof e) return e.apply(null, n)
  };
  var l = function(e) {
    return e && "object" === s(e) && e.constructor === Array
  };
  n.isArray = l;
  var u = function(e) {
    return e && "object" === s(e) && e.constructor === Object
  };
  n.isObject = u;
  n.isArrayAllFalse = function(e) {
    return !!l(e) && e.every(function(e) {
      return !e
    })
  };
  n.displayPersistentConsentLink = function(e) {
    if ((e && e.displayPersistentConsentLink || e.softOptInEnabled) && !document.querySelector(".qc-cmp-persistent-link")) {
      var n = o.PERSISTENT_LINK_POSITIONS[e.persistentConsentLinkLocation],
        t = document.createElement("a");
      t.addEventListener("click", function() {
        window.__cmp("displayConsentUi", 2, !0)
      }), t.innerHTML = o.COG_SVG_ICON + e.persistentConsentLinkLabel, t.classList.add("qc-cmp-persistent-link"), t.style.cssText = o.PERSISTENT_LINK_STYLE + n, document.getElementsByTagName("body")[0].appendChild(t)
    }
  };
  n.isObjectAllFalse = function(e) {
    if (!u(e)) return !1;
    for (var n in e)
      if (Object.prototype.hasOwnProperty.call(e, n) && e[n]) return !1;
    return !0
  };
  n.isNonEmptyString = function(e) {
    return e && e.length && e.trim()
  };
  n.isPositiveInt = function(e) {
    return "number" == typeof e && isFinite(e) && Math.floor(e) === e && e >= 0
  };
  n.isValidMarkdownLink = function(e) {
    if ("string" == typeof e) {
      var n = e.match(o.MARKDOWN_LINK_REGEX);
      return n && a.isUri(n[2])
    }
  };
  n.isValidPublisherVendorListUrl = function(e) {
    return a.isUri(e) && -1 != e.indexOf("/.well-known/pubvendors.json")
  };
  n.isValidNonIabVendorListUrl = function(e) {
    return a.isUri(e) && -1 != e.indexOf("/.well-known/noniab-vendorlist.json")
  };
  n.isValidUrl = function(e) {
    return a.isUri(e)
  };
  n.isUnsupportedBrowser = function() {
    return window.navigator.userAgent.match(/MSIE [2-9]\.(0|5)/)
  };
  n.filterVendorsByDeletedFlag = function(e, n) {
    for (var t = [], o = [], i = 0; i < e.length; i++) e[i].deletedDate ? o.push(e[i]) : t.push(e[i]);
    return n ? o : t
  };
  n.fetchLatestGVl = function(e) {
    i.default.getVendorList("LATEST", function(n, t) {
      t ? e(n) : console.warn("Unable to get latest vendor list. Aborting UI display...")
    })
  }
}, function(e, n, t) {
  "use strict";
  Object.defineProperty(n, "__esModule", {
    value: !0
  }), n.US_STATES = n.MODE = n.USP_APIVER = n.COOKIE_ACCESS_IFRAME_TIMEOUT = n.COOKIE_ACCESS_IFRAME_ID = n.COOKIE_TYPE = n.THIRD_PARTY_COOKIE_MARK = n.THIRD_PARTY_COOKIE_CHECK_TIMEOUT = n.COG_SVG_ICON = n.PERSISTENT_LINK_STYLE = n.PERSISTENT_LINK_POSITIONS = n.DEFAULT_LANGUAGE = n.MARKDOWN_LINK_REGEX = n.BETA_MAX_VENDOR_ID = n.CONSENT_STRING_VERSION = n.COOKIE_MAX_AGE = n.MAX_VALID_CMP_ID = n.NOT_VALID_CMP_IDS = n.USP_COOKIE_NAME = n.REPROMPT_OPTIONS_COOKIE_NAME = n.NON_IAB_HASH_COOKIE_NAME = n.BLOCKED_HASH_COOKIE_NAME = n.NONIABVENDOR_CONSENT_COOKIE_NAME = n.GOOGLE_CONSENT_COOKIE_NAME = n.PUBLISHER_CONSENT_COOKIE_NAME = n.VENDOR_CONSENT_COOKIE_NAME = void 0;
  n.VENDOR_CONSENT_COOKIE_NAME = "euconsent";
  n.PUBLISHER_CONSENT_COOKIE_NAME = "eupubconsent";
  n.GOOGLE_CONSENT_COOKIE_NAME = "googlepersonalization";
  n.NONIABVENDOR_CONSENT_COOKIE_NAME = "noniabvendorconsent";
  n.BLOCKED_HASH_COOKIE_NAME = "_cmpBlockedVendorsHash";
  n.NON_IAB_HASH_COOKIE_NAME = "_cmpNonIabVendorsHash";
  n.REPROMPT_OPTIONS_COOKIE_NAME = "_cmpRepromptOptions";
  n.USP_COOKIE_NAME = "usprivacy";
  n.NOT_VALID_CMP_IDS = [0, 1];
  n.MAX_VALID_CMP_ID = 299;
  n.COOKIE_MAX_AGE = 33696e3;
  n.CONSENT_STRING_VERSION = 1;
  n.BETA_MAX_VENDOR_ID = 4020;
  n.MARKDOWN_LINK_REGEX = /^\[(.+)\]\((http\:\/\/.+|https\:\/\/.+)\)$/;
  n.DEFAULT_LANGUAGE = "en";
  n.PERSISTENT_LINK_POSITIONS = {
    1: "top: 0; left: 0; border-bottom-left-radius: 3px; border-bottom-right-radius: 3px;",
    2: "top: 0; right: 0; border-bottom-left-radius: 3px; border-bottom-right-radius: 3px;",
    3: "bottom: 0; right: 0; border-top-left-radius: 3px; border-top-right-radius: 3px;",
    4: "bottom: 0; left: 0; border-top-left-radius: 3px; border-top-right-radius: 3px;"
  };
  n.PERSISTENT_LINK_STYLE = "cursor: pointer; position: fixed; background-color: #368bd6; padding: 5px 15px; color: #FFFFFF; display: flex; align-items: center; max-height: 30px; z-index: 2147483640;";
  n.COG_SVG_ICON = '<svg width="16px" height="17px" viewBox="0 0 16 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin-right: 5px; height: 17px;"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="cog" fill="#FFFFFF" fill-rule="nonzero"><path d="M15.596917,9.98326938 L14.5041079,9.33798816 C14.5728064,8.7815386 14.5728064,8.2184614 14.5041079,7.66201184 L15.596917,7.01673062 C15.9178229,6.82726259 16.0726124,6.43742732 15.9670848,6.0741546 C15.5912871,4.78033611 14.9223646,3.61573153 14.0390021,2.66061113 C13.7831755,2.38401797 13.3749053,2.32348965 13.0525249,2.51384881 L11.9613243,3.15813608 C11.5248519,2.81840117 11.0481221,2.53648663 10.542482,2.31910255 L10.542482,1.02991108 C10.542482,0.648438733 10.2860522,0.316869683 9.92305592,0.229024792 C8.66155,-0.07632446 7.33871809,-0.0763587342 6.07694408,0.229024792 C5.71398131,0.316869683 5.457518,0.648404458 5.457518,1.02991108 L5.457518,2.31910255 C4.95187406,2.53647872 4.47514334,2.81839382 4.03867572,3.15813608 L2.94747511,2.51384881 C2.62506122,2.32348965 2.21679094,2.38401797 1.96099786,2.66061113 C1.07763542,3.61573153 0.40871289,4.78037038 0.0329152236,6.0741546 C-0.072612407,6.43742732 0.0821770899,6.82722832 0.403082962,7.01673062 L1.49589212,7.66201184 C1.42719356,8.2184614 1.42719356,8.7815386 1.49589212,9.33798816 L0.403082962,9.98326938 C0.0821770899,10.1727374 -0.072612407,10.5625727 0.0329152236,10.9258454 C0.40871289,12.2196296 1.07763542,13.3842685 1.96099786,14.3393889 C2.21682445,14.615982 2.62509474,14.6765103 2.94747511,14.4861855 L4.03867572,13.8418982 C4.47514096,14.1816349 4.95187243,14.4635389 5.457518,14.6808975 L5.457518,15.9700889 C5.457518,16.3515613 5.7139478,16.6831303 6.07694408,16.7709752 C7.33848351,17.0763245 8.66128191,17.0763587 9.92305592,16.7709752 C10.2860187,16.6831303 10.542482,16.3515955 10.542482,15.9700889 L10.542482,14.6808975 C11.0481183,14.4635198 11.5248475,14.1816171 11.9613243,13.8418982 L13.0525249,14.4861855 C13.3749053,14.6765446 13.7831755,14.6160163 14.0390021,14.3393889 C14.9223646,13.3842685 15.5912871,12.2196296 15.9670848,10.9258454 C16.0726124,10.5625727 15.9178229,10.1727717 15.596917,9.98326938 Z M13.4026193,13.4264943 L11.8507364,12.510001 C10.9463288,13.3007421 10.6255905,13.4997041 9.47011484,13.9172673 L9.47011484,15.7502196 C8.50024808,15.9548373 7.49975192,15.9548373 6.52988516,15.7502196 L6.52988516,13.9172673 C5.4031959,13.5101235 5.07699522,13.3210668 4.14926358,12.510001 L2.59738075,13.4264943 C1.9368696,12.6693763 1.43490124,11.7817076 1.12525522,10.8230912 L2.67780828,9.90659789 C2.4588108,8.69270694 2.45871027,8.30790999 2.67780828,7.09340211 L1.12525522,6.17690879 C1.43490124,5.21829242 1.93690311,4.33058946 2.59738075,3.57312864 L4.14926358,4.49030745 C5.0667072,3.68712478 5.39129933,3.4941265 6.52988516,3.08269846 L6.52988516,1.24978037 C7.49971774,1.04482059 8.50028226,1.04482059 9.47011484,1.24978037 L9.47011484,3.08273274 C10.6087677,3.49419505 10.9333933,3.6872276 11.8507364,4.49034172 L13.4026193,3.57316291 C14.0630969,4.33058946 14.5650988,5.21829242 14.8747448,6.17694306 L13.3221917,7.09343638 C13.5412227,8.3076358 13.5412897,8.69212428 13.3221917,9.90663217 L14.8747448,10.8231255 C14.5650988,11.7817076 14.0631304,12.6694105 13.4026193,13.4264943 Z M8,5.20968958 C6.22607014,5.20968958 4.78289853,6.68570996 4.78289853,8.50001714 C4.78289853,10.3143243 6.22607014,11.7903447 8,11.7903447 C9.77392986,11.7903447 11.2171015,10.3143243 11.2171015,8.50001714 C11.2171015,6.68570996 9.77392986,5.20968958 8,5.20968958 Z M8,10.6935688 C6.81738009,10.6935688 5.85526568,9.70955526 5.85526568,8.50001714 C5.85526568,7.29047902 6.81738009,6.30646543 8,6.30646543 C9.18261991,6.30646543 10.1447343,7.29047902 10.1447343,8.50001714 C10.1447343,9.70955526 9.18261991,10.6935688 8,10.6935688 Z" id="Shape"></path></g></g></svg>';
  n.THIRD_PARTY_COOKIE_CHECK_TIMEOUT = 3e3;
  n.THIRD_PARTY_COOKIE_MARK = "_cmpQcif3pcsupported";
  n.COOKIE_TYPE = {
    GROUP: "GROUP",
    FIRST_PARTY: "1p",
    THIRD_PARTY: "3p",
    LOCAL_STORAGE: "LOCAL_STORAGE"
  };
  n.COOKIE_ACCESS_IFRAME_ID = "_qc_cookie_access";
  n.COOKIE_ACCESS_IFRAME_TIMEOUT = 50;
  n.USP_APIVER = 1;
  n.MODE = {
    NOTSET: 0,
    GDPR: 1,
    USP: 2,
    GDPR_AND_USP: 3
  };
  n.US_STATES = ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY", "US"]
}, function(e, n, t) {
  "use strict";
  Object.defineProperty(n, "__esModule", {
    value: !0
  }), n.default = n.initializeConfig = n.getConfig = n.isParentOrSameDomain = n.isParentOrSamePath = n.isConfigInitialized = n.config = void 0;
  var o, i = t(0),
    s = t(1),
    a = t(7);

  function r(e, n, t) {
    return n in e ? Object.defineProperty(e, n, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[n] = t, e
  }
  var l = {};
  n.config = l;
  var u = !1;
  n.isConfigInitialized = u;
  var c = function(e) {
      return (e + "").replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")
    },
    d = function(e, n) {
      return !!n.match(new RegExp("^" + c(e) + ("/" === e[e.length - 1] ? "" : "($|/)")))
    };
  n.isParentOrSamePath = d;
  var p = function(e, n) {
    return !!n.match(new RegExp("(^|\\.)" + c(e) + "$"))
  };
  n.isParentOrSameDomain = p;
  var E = (r(o = {
    pCode: {
      publicConfigKey: "PCode",
      getDefaultValue: function() {
        return null
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    googlePersonalization: {
      publicConfigKey: "Google Personalization",
      getDefaultValue: function() {
        return !0
      },
      isValidValue: function(e) {
        return "boolean" == typeof e
      },
      validValue: "a boolean"
    },
    testMode: {
      publicConfigKey: "Test Mode",
      getDefaultValue: function() {
        return !1
      },
      isValidValue: function(e) {
        return "boolean" == typeof e
      },
      validValue: "a boolean"
    },
    displayUi: {
      publicConfigKey: "Display UI",
      getDefaultValue: function() {
        return window.__cmp.gdprAppliesGlobally ? "always" : "inEU"
      },
      isValidValue: function(e) {
        var n = !1;
        return ["never", "inEU", "always"].forEach(function(t) {
          t === e && (n = !0)
        }), n
      },
      validValue: "one of 'never', 'inEU', or 'always'"
    },
    uiLayout: {
      publicConfigKey: "UI Layout",
      getDefaultValue: function() {
        return "popup"
      },
      isValidValue: function(e) {
        var n = !1;
        return ["popup", "banner"].forEach(function(t) {
          t === e && (n = !0)
        }), n
      },
      validValue: "one of 'popup', or 'banner'"
    },
    vendorListUpdateFreq: {
      publicConfigKey: "Min Days Between UI Displays",
      getDefaultValue: function() {
        return 30
      },
      isValidValue: i.isPositiveInt,
      validValue: "a positive integer"
    },
    nonconsentDisplayFrequency: {
      publicConfigKey: "Non-Consent Display Frequency",
      getDefaultValue: function() {
        return 1
      },
      isValidValue: i.isPositiveInt,
      validValue: "a positive integer"
    },
    cookieDomain: {
      publicConfigKey: "Cookie Domain",
      getDefaultValue: function() {
        return window.location.hostname
      },
      isValidValue: function(e) {
        return p(e, window.location.hostname)
      },
      validValue: "a parent of, or equal to, the current domain"
    },
    cookiePath: {
      publicConfigKey: "Cookie Path",
      getDefaultValue: function() {
        return "/"
      },
      isValidValue: function(e) {
        return d(e, window.location.pathname)
      },
      validValue: "a parent of, or equal to, the current URL's path"
    },
    consentScope: {
      publicConfigKey: "Consent Scope",
      getDefaultValue: function() {
        return "global"
      },
      isValidValue: function(e) {
        return l.mode === s.MODE.USP ? ["service", "service group"].includes(e) : ["global", "service", "global group", "service group"].includes(e)
      },
      validValue: "one of 'global', 'service', 'global group', 'service group'",
      hasDependency: function() {
        var e = E.groupCookieAccessHostUrl.isValidValue(l.groupCookieAccessHostUrl) || E.consentScopeGroupURL.isValidValue(l.consentScopeGroupURL);
        return ["global", "service"].includes(l.consentScope) ? {
          dependentConfig: null,
          isValid: !0,
          invalidValueMessage: ""
        } : e ? {
          dependentConfig: E.groupCookieAccessHostUrl.isValidValue(l.groupCookieAccessHostUrl) ? E.groupCookieAccessHostUrl.publicConfigKey : E.consentScopeGroupURL.publicConfigKey,
          isValid: !0,
          invalidValueMessage: ""
        } : (l.consentScope = "global group" === l.consentScope ? "global" : "service", {
          dependentConfig: E.consentScopeGroupURL.publicConfigKey,
          isValid: !1,
          invalidValueMessage: E.consentScopeGroupURL.publicConfigKey + " must be " + E.consentScopeGroupURL.validValue + " when " + this.publicConfigKey + " is 'global group', or 'service group'. Resetting it to " + l.consentScope
        })
      }
    },
    consentScopeGroupURL: {
      publicConfigKey: "Consent Scope Group URL",
      getDefaultValue: function() {
        return ""
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty domain",
      hasDependency: function() {
        return ["global group", "service group"].includes(l.consentScope) ? {
          dependentConfig: E.consentScope.publicConfigKey,
          isValid: !0,
          invalidValueMessage: ""
        } : {
          dependentConfig: E.consentScope.publicConfigKey,
          isValid: !1,
          invalidValueMessage: E.consentScope.publicConfigKey + " should be either 'global group', or 'service group' for Group Url to be effective. Group Url will be ignored"
        }
      }
    },
    rejectConsentRedirectUrl: {
      publicConfigKey: "Post Consent Page",
      getDefaultValue: function() {
        return null
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    publisherName: {
      publicConfigKey: "Publisher Name",
      getDefaultValue: function() {
        return "[Company Name]"
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    publisherPurposeIds: {
      publicConfigKey: "Publisher Purpose IDs",
      getDefaultValue: function() {
        return []
      },
      isValidValue: function(e) {
        return (0, i.isArray)(e) && e.reduce(function(e, n) {
          return e && (0, i.isPositiveInt)(n)
        }, !0)
      },
      validValue: "an array containing purpose ids"
    },
    publisherPurposeLegitimateInterestIds: {
      publicConfigKey: "Publisher Purpose Legitimate Interest IDs",
      getDefaultValue: function() {
        return []
      },
      isValidValue: function(e) {
        return (0, i.isArray)(e) && e.reduce(function(e, n) {
          return e && (0, i.isPositiveInt)(n)
        }, !0)
      },
      validValue: "an array containing only purpose ids listed in the Publisher Purpose IDs array",
      hasDependency: function() {
        return l.publisherPurposeLegitimateInterestIds.every(function(e) {
          return l.publisherPurposeIds.includes(e)
        }) ? {
          dependentConfig: E.publisherPurposeIds.publicConfigKey,
          isValid: !0,
          invalidValueMessage: ""
        } : {
          dependentConfig: E.publisherPurposeIds.publicConfigKey,
          isValid: !1,
          invalidValueMessage: "Publisher Purpose Legitimate Interest IDs must be an array containing only purpose IDs contained in the Publisher Purpose IDs array, the following purpose IDs will be ignored: " + l.publisherPurposeLegitimateInterestIds.filter(function(e) {
            if (!l.publisherPurposeIds.includes(e)) return e
          }).join(", ")
        }
      }
    },
    publisherLogo: {
      publicConfigKey: "Publisher Logo",
      getDefaultValue: function() {
        return ""
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    displayPersistentConsentLink: {
      publicConfigKey: "Display Persistent Consent Link",
      getDefaultValue: function() {
        return !0
      },
      isValidValue: function(e) {
        return "boolean" == typeof e
      },
      validValue: "a boolean"
    },
    softOptInEnabled: {
      publicConfigKey: "Soft Opt-in Enabled",
      getDefaultValue: function() {
        return !1
      },
      isValidValue: function(e) {
        return "boolean" == typeof e
      },
      validValue: "a boolean"
    },
    persistentConsentLinkLocation: {
      publicConfigKey: "Persistent Consent Link Location",
      getDefaultValue: function() {
        return 3
      },
      isValidValue: function(e) {
        return [1, 2, 3, 4].includes(e)
      },
      validValue: "one of the following values: {1, 2, 3, 4}"
    },
    defaultToggleValue: {
      publicConfigKey: "Default Value for Toggles",
      getDefaultValue: function() {
        return "off"
      },
      isValidValue: function(e) {
        return ["on", "off"].includes(e)
      },
      validValue: "one of either 'on', or 'off'"
    },
    language: {
      publicConfigKey: "Language",
      getValue: function(e) {
        return e.toLowerCase()
      },
      getDefaultValue: function() {
        return s.DEFAULT_LANGUAGE
      },
      isValidValue: function(e) {
        return !(!e || !a.IAB_SUPPORTED_LANGUAGES.includes(e.toLowerCase()) && !a.QC_SUPPORTED_LANGUAGES.includes(e.toLowerCase()))
      },
      validValue: "one of the following languages: {" + a.IAB_SUPPORTED_LANGUAGES + "}"
    },
    softOptInAlertTitle: {
      publicConfigKey: "Soft Opt-in Alert Title Text",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "SOFT_OPT_IN_ALERT_TITLE_TEXT")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    softOptInAlertBody: {
      publicConfigKey: "Soft Opt-in Alert Body Text",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "SOFT_OPT_IN_ALERT_BODY_TEXT")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    initScreenTitle: {
      publicConfigKey: "Initial Screen Title Text",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "INIT_SCREEN_TITLE_TEXT")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    initScreenBodyTextOption: {
      publicConfigKey: "Initial Screen Body Text Option",
      getDefaultValue: function() {
        return 1
      },
      isValidValue: function(e) {
        return [1, 2, 3, 4].includes(e)
      },
      validValue: "one of the following values: {1, 2, 3, 4}"
    },
    initScreenBody: {
      publicConfigKey: "Initial Screen Body Text",
      getDefaultValue: function() {
        return l.publisherName + " and our partners use technology such as cookies on our site to personalize content and ads, provide social media features, and analyze our traffic. Click below to consent to the use of this technology by " + l.publisherName + " and these 3rd parties across the web. You can change your mind and revisit your consent choices at anytime by returning to this site."
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    customInitScreenBodyText: {
      publicConfigKey: "Custom Initial Screen Body Text",
      getDefaultValue: function() {
        return ""
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    initScreenRejectButton: {
      publicConfigKey: "Initial Screen Reject Button Text",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "INIT_SCREEN_REJECT_BUTTON_TEXT")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    initScreenRejectButtonAsLink: {
      publicConfigKey: "Display No Button as Link",
      getDefaultValue: function() {
        return !1
      },
      isValidValue: function(e) {
        return "boolean" == typeof e
      },
      validValue: "a boolean"
    },
    initScreenRejectButtonShowing: {
      publicConfigKey: "No Option",
      getDefaultValue: function() {
        return !0
      },
      isValidValue: function(e) {
        return "boolean" == typeof e
      },
      validValue: "a boolean"
    },
    initScreenSettingsButton: {
      publicConfigKey: "Initial Screen Settings Button Text",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "INIT_SCREEN_SETTINGS_BUTTON_TEXT")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    initScreenAcceptButton: {
      publicConfigKey: "Initial Screen Accept Button Text",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "INIT_SCREEN_ACCEPT_BUTTON_TEXT")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    initScreenPurposeLink: {
      publicConfigKey: "Initial Screen Purpose Link Text",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "INIT_SCREEN_PURPOSE_LINK_TEXT")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    initScreenCustomLinks: {
      publicConfigKey: "Custom Links Displayed on Initial Screen",
      getDefaultValue: function() {
        return []
      },
      isValidValue: function(e) {
        return e.length <= 2 && e.every(function(e) {
          return (0, i.isValidMarkdownLink)(e)
        })
      },
      validValue: 'an array of 2 or fewer markdown links: "[link text](url)"'
    },
    initScreenAttributionText: {
      publicConfigKey: "Initial Screen Attribution Text",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "INIT_SCREEN_ATTRIBUTION_TEXT")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    purposeScreenHeaderTitle: {
      publicConfigKey: "Purpose Screen Header Title Text",
      getDefaultValue: function() {
        return "Privacy Settings"
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    purposeScreenTitle: {
      publicConfigKey: "Purpose Screen Title Text",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "PURPOSE_SCREEN_TITLE_TEXT")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    purposeScreenBody: {
      publicConfigKey: "Purpose Screen Body Text",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "PURPOSE_SCREEN_BODY_TEXT")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    purposeScreenEnableAllButtonLabel: {
      publicConfigKey: "Purpose Screen Enable All Button Text",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "ACCEPT_ALL_BUTTON_TEXT")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    purposeScreenDisableAllButtonLabel: {
      publicConfigKey: "Purpose Screen Disable All Button Text",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "REJECT_ALL_BUTTON_TEXT")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    purposeScreenVendorLink: {
      publicConfigKey: "Purpose Screen Vendor Link Text",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "PURPOSE_SCREEN_VENDOR_LINK_TEXT")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    purposeScreenCancelButton: {
      publicConfigKey: "Purpose Screen Cancel Button Text",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "PURPOSE_SCREEN_CANCEL_BUTTON_TEXT")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    purposeScreenSaveAndExitButton: {
      publicConfigKey: "Purpose Screen Save and Exit Button Text",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "PURPOSE_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    vendorScreenTitle: {
      publicConfigKey: "Vendor Screen Title Text",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "VENDOR_SCREEN_TITLE_TEXT")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    vendorScreenBody: {
      publicConfigKey: "Vendor Screen Body Text",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "VENDOR_SCREEN_BODY_TEXT")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    vendorScreenRejectAllButton: {
      publicConfigKey: "Vendor Screen Reject All Button Text",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "REJECT_ALL_BUTTON_TEXT")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    vendorScreenAcceptAllButton: {
      publicConfigKey: "Vendor Screen Accept All Button Text",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "ACCEPT_ALL_BUTTON_TEXT")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    vendorScreenPurposesLink: {
      publicConfigKey: "Vendor Screen Purposes Link Text",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "VENDOR_SCREEN_PURPOSES_LINK_TEXT")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    vendorScreenCancelButton: {
      publicConfigKey: "Vendor Screen Cancel Button Text",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "VENDOR_SCREEN_CANCEL_BUTTON_TEXT")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    vendorScreenSaveAndExitButton: {
      publicConfigKey: "Vendor Screen Save and Exit Button Text",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "VENDOR_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    vendorWhiteBlackList: {
      publicConfigKey: "Vendor White List or Black List",
      getDefaultValue: function() {
        return {}
      },
      isValidValue: function(e) {
        if (void 0 === e.isWhitelist || "boolean" != typeof e.isWhitelist) return !1;
        if (!(0, i.isArray)(e.vendorIds) || !e.vendorIds.length) return !1;
        for (var n = 0; n < e.vendorIds.length; n++)
          if (!(0, i.isPositiveInt)(e.vendorIds[n])) return !1;
        return !0
      },
      validValue: "{ isWhitelist: <true/false>, vendorIds: <an array of vendor ID> }"
    },
    publisherVendorListUrl: {
      publicConfigKey: "Publisher Vendor List URL",
      getDefaultValue: function() {
        return ""
      },
      isValidValue: i.isValidPublisherVendorListUrl,
      validValue: "a valid URL containing /.well-known/pubvendors.json"
    },
    nonIabVendorListUrl: {
      publicConfigKey: "Non IAB Vendor List URL",
      getDefaultValue: function() {
        return ""
      },
      isValidValue: i.isValidNonIabVendorListUrl,
      validValue: "a valid URL containing /.well-known/noniab-vendorlist.json"
    },
    backLabel: {
      publicConfigKey: "Back Label",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "BACK_LABEL")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    persistentConsentLinkLabel: {
      publicConfigKey: "Persistent Consent Link Label",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "CONSENT_LINK_LABEL")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non empty string"
    },
    viewCompaniesLabel: {
      publicConfigKey: "View Companies Label",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "VIEW_COMPANIES_LABEL")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    hideCompaniesLabel: {
      publicConfigKey: "Hide Companies Label",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "HIDE_COMPANIES_LABEL")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    thirdPartyVendorsLabel: {
      publicConfigKey: "Third Party Vendors Label",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "THIRD_PARTY_VENDORS_LABEL")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    onLabel: {
      publicConfigKey: "On Label",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "ON_LABEL")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    offLabel: {
      publicConfigKey: "Off Label",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "OFF_LABEL")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    offOnLabel: {
      publicConfigKey: "Off On Label",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "OFF_ON_LABEL")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    companyLabel: {
      publicConfigKey: "Company Label",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "COMPANY_LABEL")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    otherLabel: {
      publicConfigKey: "Other",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "OTHER")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    nonIabVendorsLabel: {
      publicConfigKey: "Non-IAB Vendors",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "NON_IAB_TITLE")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    googlePurposesText: {
      publicConfigKey: "Google purposes text",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "GOOGLE_PURPOSES_TEXT")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    featuresLabel: {
      publicConfigKey: "Feature Label",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "FEATURES_LABEL")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    descriptionLabel: {
      publicConfigKey: "Description",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "DESCRIPTION")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    requiredLabel: {
      publicConfigKey: "Required Label",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "REQUIRED_LABEL")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    privacyPolicyLabel: {
      publicConfigKey: "Privacy Policy Label",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "PRIVACY_POLICY_LABEL")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    },
    purposesLabel: {
      publicConfigKey: "Purposes Label",
      getDefaultValue: function() {
        return (0, a.getTranslationOrDefault)(l.language, "PURPOSES_LABEL")
      },
      isValidValue: i.isNonEmptyString,
      validValue: "a non-empty string"
    }
  }, "featuresLabel", {
    publicConfigKey: "Features Label",
    getDefaultValue: function() {
      return (0, a.getTranslationOrDefault)(l.language, "FEATURES_LABEL")
    },
    isValidValue: i.isNonEmptyString,
    validValue: "a non-empty string"
  }), r(o, "legitimateInterestPurposesLabel", {
    publicConfigKey: "Legitimate Interest Purposes Label",
    getDefaultValue: function() {
      return (0, a.getTranslationOrDefault)(l.language, "LEGITIMATE_INTEREST_PURPOSES_LABEL")
    },
    isValidValue: i.isNonEmptyString,
    validValue: "a non-empty string"
  }), r(o, "groupCookieAccessHostUrl", {
    publicConfigKey: "Group Hosted HTML Cookie Access URL",
    getDefaultValue: function() {
      return null
    },
    isValidValue: i.isValidUrl,
    validValue: "a valid URL",
    hasDependency: function() {
      return ["global group", "service group"].includes(l.consentScope) ? {
        dependentConfig: E.consentScope.publicConfigKey,
        isValid: !0,
        invalidValueMessage: ""
      } : {
        dependentConfig: E.consentScope.publicConfigKey,
        isValid: !1,
        invalidValueMessage: E.consentScope.publicConfigKey + " should be either 'global group', or 'service group' for Group Hosted HTML Cookie Access URL to be effective. Group Hosted HTML Cookie Access URL will be ignored"
      }
    }
  }), r(o, "mode", {
    publicConfigKey: "Mode",
    getDefaultValue: function() {
      return s.MODE.GDPR
    },
    isValidValue: function(e) {
      return [s.MODE.GDPR, s.MODE.USP, s.MODE.GDPR_AND_USP].includes(e)
    },
    validValue: "one of the following values: {1, 2, 3}"
  }), r(o, "uspVersion", {
    publicConfigKey: "USP Version",
    getDefaultValue: function() {
      return 1
    },
    isValidValue: function(e) {
      return [1].includes(e)
    },
    validValue: "one of the following values: {1}"
  }), r(o, "uspJurisdiction", {
    publicConfigKey: "USP Jurisdiction",
    getDefaultValue: function() {
      return []
    },
    isValidValue: function(e) {
      if (!(0, i.isArray)(e)) return !1;
      var n = !0;
      return e.forEach(function(e) {
        s.US_STATES.includes(e.toUpperCase()) || (n = !1)
      }), n
    },
    validvalue: "an array of state abbreviations"
  }), r(o, "uspLspact", {
    publicConfigKey: "USP LSPACT",
    getDefaultValue: function() {
      return "N"
    },
    isValidValue: function(e) {
      return ["Y", "N"].indexOf(e) >= 0
    },
    validValue: "one of either 'Y', or 'N'"
  }), r(o, "uspDnsTitle", {
    publicConfigKey: "Do Not Sell Screen Title Text",
    getDefaultValue: function() {
      return (0, a.getTranslationOrDefault)(l.language, "USP_DNS_TITLE")
    },
    isValidValue: i.isNonEmptyString,
    validValue: "a non-empty string"
  }), r(o, "uspDnsText", {
    publicConfigKey: "Do Not Sell Screen Text",
    getDefaultValue: function() {
      return (0, a.getTranslationOrDefault)(l.language, "USP_DNS_BODY_TEXT")
    },
    isValidValue: i.isNonEmptyString,
    validValue: "a non-empty string"
  }), r(o, "uspDoNotSellToggleText", {
    publicConfigKey: "Do Not Sell Toggle Text",
    getDefaultValue: function() {
      return (0, a.getTranslationOrDefault)(l.language, "USP_DNS_TOGGLE_TEXT")
    },
    isValidValue: i.isNonEmptyString,
    validValue: "a non-empty string"
  }), r(o, "uspPrivacyPolicyLink", {
    publicConfigKey: "Business Privacy Policy Link",
    getDefaultValue: function() {
      return ""
    },
    isValidValue: i.isValidUrl,
    validValue: "a valid URL"
  }), r(o, "uspPrivacyPolicyLinkText", {
    publicConfigKey: "Business Privacy Policy Link Text",
    getDefaultValue: function() {
      return (0, a.getTranslationOrDefault)(l.language, "USP_PRIVACY_POLICY_TEXT")
    },
    isValidValue: i.isNonEmptyString,
    validValue: "a non-empty string"
  }), r(o, "uspDeleteDataLink", {
    publicConfigKey: "Business Delete Data Request Link",
    getDefaultValue: function() {
      return ""
    },
    isValidValue: i.isValidUrl,
    validValue: "a valid URL"
  }), r(o, "uspDeleteDataLinkText", {
    publicConfigKey: "Business Delete Data Request Text",
    getDefaultValue: function() {
      return (0, a.getTranslationOrDefault)(l.language, "USP_DATA_DELETION_TEXT")
    },
    isValidValue: i.isNonEmptyString,
    validValue: "a non-empty string"
  }), r(o, "uspAccessDataLink", {
    publicConfigKey: "Business Access Data Request Link",
    getDefaultValue: function() {
      return ""
    },
    isValidValue: i.isValidUrl,
    validValue: "a valid URL"
  }), r(o, "uspAccessDataLinkText", {
    publicConfigKey: "Business Access Data Request Link Text",
    getDefaultValue: function() {
      return (0, a.getTranslationOrDefault)(l.language, "USP_DATA_ACCESS_TEXT")
    },
    isValidValue: i.isNonEmptyString,
    validValue: "a non-empty string"
  }), r(o, "uspAcceptButton", {
    publicConfigKey: "Do Not Sell Accept Button Text",
    getDefaultValue: function() {
      return (0, a.getTranslationOrDefault)(l.language, "USP_CONFIRM_BUTTON_TEXT")
    },
    isValidValue: i.isNonEmptyString,
    validValue: "a non-empty string"
  }), o);
  n.getConfig = function() {
    var e = {};
    if ("external" === (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "external")) {
      for (var n in l) e[E[n].publicConfigKey] = l[n];
      return e
    }
    return l
  };
  n.initializeConfig = function(e) {
    for (var t in e = e || {}, E) {
      var o = e[E[t].publicConfigKey];
      if (void 0 !== o)
        if (E[t].isValidValue(o)) void 0 !== E[t].getValue ? l[t] = E[t].getValue(o) : l[t] = o;
        else {
          l[t] = E[t].getDefaultValue();
          var i = E[t].publicConfigKey,
            s = o + " is not a valid value for the config option " + i + ". ",
            r = i + " must be " + E[t].validValue;
          console.warn(s + r)
        }
      else l[t] = E[t].getDefaultValue()
    }
    for (var t in E)
      if (e[E[t].publicConfigKey] && E[t].hasDependency) {
        var c = E[t].hasDependency();
        c.isValid || console.warn("Dependency check failed for " + E[t].publicConfigKey + ": " + c.invalidValueMessage)
      }!
    function(e) {
      var n = e[E.initScreenBodyTextOption.publicConfigKey],
        t = e[E.language.publicConfigKey],
        o = e[E.initScreenBody.publicConfigKey];
      if (e[E.softOptInEnabled.publicConfigKey]) l.initScreenBody = (0, a.getTranslationOrDefault)(l.language, "INIT_SCREEN_BODY_TEXT").softOptIn;
      else if (4 === n) {
        var i = JSON.parse(l.customInitScreenBodyText);
        l.initScreenBody = i[l.language], void 0 === l.initScreenBody && (l.initScreenBody = i.en)
      } else {
        if (E.initScreenBodyTextOption.isValidValue(n) && E.language.isValidValue(t)) return void(l.initScreenBody = (0, a.getTranslationOrDefault)(l.language, "INIT_SCREEN_BODY_TEXT")[l.initScreenBodyTextOption]);
        E.initScreenBody.isValidValue(o) || (l.initScreenBody = l.initScreenBody = (0, a.getTranslationOrDefault)(l.language, "INIT_SCREEN_BODY_TEXT")[l.initScreenBodyTextOption])
      }
    }(e), n.isConfigInitialized = u = !0
  };
  var f = l;
  n.default = f
}, function(e, n, t) {
  "use strict";
  Object.defineProperty(n, "__esModule", {
    value: !0
  }), n.logEvent = n.log = n.logAcceptanceState = n.logSetCookieEvent = n.logTracking = n.generateSessionId = n.track = void 0;
  var o = t(2),
    i = t(0),
    s = t(8),
    a = "";
  n.track = function(e, n) {
    a += e + (n ? ":" + n : "") + ","
  };
  n.generateSessionId = function(e) {
    var n = new Int32Array(4),
      t = e;
    n = (window.document.documentMode ? msCrypto : crypto).getRandomValues(n);
    for (var o = 0; o < 4; o++) t += n[o].toString(36).substring(1, 6);
    window.sessionStorage.setItem("sessionId", t)
  };
  var r = function(e) {
    return [e.uiLayout[0], e.defaultToggleValue, e.initScreenRejectButtonShowing, e.pCode, e.initScreenBodyTextOption, e.language, "30", (0, s.getConsentInfo)().vendorList.vendorListVersion, e.googlePersonalization, e.publisherVendorListUrl ? "true" : "false", e.nonIabVendorListUrl ? "true" : "false"].join(",")
  };
  n.logTracking = function(e, n) {
    var t = "";
    window.location && window.location.href && (t = encodeURIComponent(window.location.href));
    var o = [n, (new Date).getTime(), encodeURIComponent(e.publisherName), t, "", "", "", "", r(e), a].join(";");
    l(o), a = ""
  };
  n.logSetCookieEvent = function(e, n) {
    if (e && e.value) {
      var t = "";
      window.location && window.location.href && (t = encodeURIComponent(window.location.href)), a = "setCookie";
      var i = [n, (new Date).getTime(), encodeURIComponent(o.config.publisherName), t, e.type, e.name, e.value, e.cookieDomain, r(o.config), a].join(";");
      l(i), a = ""
    }
  };
  n.logAcceptanceState = function(e) {
    if (e) {
      var n = "";
      window.location && window.location.href && (n = encodeURIComponent(window.location.href));
      var t = "setAcceptanceState:" + e,
        i = ["", (new Date).getTime(), encodeURIComponent(o.config.publisherName), n, "", "", "", "", r(o.config), t].join(";");
      l(i)
    }
  };
  var l = function(e) {
    var n = "https://audit.quantcast.mgr.consensu.org/?log=" + e + ";" + window.sessionStorage.getItem("sessionId");
    (0, i.getJson)({
      url: n
    }, function() {})
  };
  n.log = l;
  n.logEvent = function(e, n, t) {
    var i = "";
    void 0 === n && (n = o.config), window.location && window.location.href && (i = encodeURIComponent(window.location.href));
    var s = [t, (new Date).getTime(), encodeURIComponent(n.publisherName), i, "", "", "", "", r(n), e].join(";");
    l(s)
  }
}, function(e, n, t) {
  "use strict";
  Object.defineProperty(n, "__esModule", {
    value: !0
  }), n.PublisherConsentAccess = n.NonIabVendorConsentAccess = n.VendorConsentAccess = n.ConsentAccess = n.RepromptOptionsAccess = n.GoogleConsentAccess = void 0;
  var o = t(1),
    i = t(0),
    s = {
      CMP_ID: 10,
      LOWERCASE_START: "a".charCodeAt(0),
      PAD_ZEROS: "00000000000000000000000000000000000000000000000000",
      BITFIELD_ENCODING: 0,
      RANGES_ENCODING: 1
    },
    a = function() {
      this.binaryStr = "", this.addField = function(e, n, t) {
        var o = (e + 0 || 0).toString(2);
        if (o.length < n) o = s.PAD_ZEROS.substr(0, n - o.length) + o;
        else if (o.length > n) throw new Error("Encountered an overflow setting cookie field " + t);
        this.binaryStr += o
      }
    },
    r = function(e) {
      this.fieldSizes = e, this.fields = {}
    };
  r.prototype.build = function(e, n) {
    var t = this.encodeBinary(e, n),
      o = this.binaryToBytes(t);
    return this.toWebSafeBase64(o)
  }, r.prototype.setAll = function(e) {
    var n = this.fromWebSafeBase64(e),
      t = this.bytesToBinary(n);
    return this.decodeBinary(t)
  }, r.prototype.bytesToBinary = function(e) {
    for (var n = "", t = ["0000", "0001", "0010", "0011", "0100", "0101", "0110", "0111", "1000", "1001", "1010", "1011", "1100", "1101", "1110", "1111"], o = function(e) {
        return t[e >>> 4 & 15] + t[15 & e]
      }, i = 0; i < e.length; i++) n += o(e.charCodeAt(i));
    return {
      string: n,
      atPos: 0,
      getBits: function(e) {
        var n = parseInt(this.string.substr(this.atPos, e), 2);
        return this.atPos += e, n
      }
    }
  }, r.prototype.binaryToBytes = function(e) {
    var n = "";
    e += s.PAD_ZEROS.substr(0, 7 - (e.length + 7) % 8);
    for (var t = 0; t < e.length; t += 8) n += String.fromCharCode(parseInt(e.substr(t, 8), 2));
    return n
  }, r.prototype.toWebSafeBase64 = function(e) {
    return btoa(e).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
  }, r.prototype.fromWebSafeBase64 = function(e) {
    return atob(e.replace(/-/g, "+").replace(/_/g, "/"))
  }, r.prototype.languageFromCookieValue = function(e) {
    return String.fromCharCode(s.LOWERCASE_START + e / 64 >>> 0) + String.fromCharCode(s.LOWERCASE_START + e % 64)
  }, r.prototype.languageToCookieValue = function(e) {
    return 64 * (e.charCodeAt(0) - s.LOWERCASE_START) + (e.charCodeAt(1) - s.LOWERCASE_START)
  }, r.prototype.dateFromDeciseconds = function(e) {
    return new Date(100 * e)
  }, r.prototype.dateToDeciseconds = function(e) {
    return Math.floor(e.getTime() / 100)
  }, r.prototype.decodeSharedFields = function(e) {
    var n = this.fieldSizes,
      t = e.getBits(n.version);
    if (t != o.CONSENT_STRING_VERSION) throw new Error("Cookie version " + t + " is not supported");
    var i = {
      version: t,
      created: this.dateFromDeciseconds(e.getBits(n.created)),
      lastUpdated: this.dateFromDeciseconds(e.getBits(n.lastUpdated)),
      cmpId: e.getBits(n.cmpId),
      cmpVersion: e.getBits(n.cmpVersion)
    };
    return i.cmpVersion >= Math.pow(2, n.cmpVersionOld) && (e.atPos -= n.cmpVersion, i.cmpVersion = e.getBits(n.cmpVersionOld)), i.consentScreen = e.getBits(n.consentScreen), i.consentLanguage = this.languageFromCookieValue(e.getBits(n.consentLanguage)), i.vendorListVersion = e.getBits(n.vendorListVersion), i
  }, r.prototype.encodeSharedFields = function(e) {
    var n = this.fieldSizes,
      t = new a;
    if (e.version != o.CONSENT_STRING_VERSION) throw new Error("version " + e.version + " not supported");
    return t.addField(e.version, n.version, "version"), t.addField(this.dateToDeciseconds(e.created), n.created, "created"), t.addField(this.dateToDeciseconds(e.lastUpdated), n.lastUpdated, "lastUpdated"), t.addField(e.cmpId, n.cmpId, "cmpId"), t.addField(e.cmpVersion, n.cmpVersion, "cmpVersion"), t.addField(e.consentScreen, n.consentScreen, "consentScreen"), t.addField(this.languageToCookieValue(e.consentLanguage || "en"), n.consentLanguage, "consentLanguage"), t.addField(e.vendorListVersion, n.vendorListVersion, "vendorListVersion"), t
  };
  var l = {
    created: 36,
    lastUpdated: 36,
    cmpId: 12,
    cmpVersion: 12,
    maxVendorId: 16
  };

  function u() {
    r.call(this, l)
  }
  u.prototype = Object.create(r.prototype), u.prototype.constructor = u, u.prototype.decodeBinary = function(e) {
    for (var n = this.fieldSizes, t = {
        created: this.dateFromDeciseconds(e.getBits(n.created)),
        lastUpdated: this.dateFromDeciseconds(e.getBits(n.lastUpdated)),
        cmpId: e.getBits(n.cmpId),
        cmpVersion: e.getBits(n.cmpVersion),
        maxVendorId: e.getBits(n.maxVendorId)
      }, o = t.maxVendorId, i = new Array(o + 1), s = 0; s < o; s++) i[s + 1] = "1" == e.string.charAt(e.atPos + s);
    return t.vendorConsents = i, t
  }, u.prototype.encodeBinary = function(e, n) {
    var t = this.fieldSizes,
      o = e.vendorConsents,
      i = new a;
    if (i.addField(this.dateToDeciseconds(e.created), t.created, "created"), i.addField(this.dateToDeciseconds(e.lastUpdated), t.lastUpdated, "lastUpdated"), i.addField(e.cmpId, t.cmpId, "cmpId"), i.addField(e.cmpVersion, t.cmpVersion, "cmpVersion"), n) return i.binaryStr;
    i.addField(e.maxVendorId, t.maxVendorId, "maxVendorId");
    for (var s = 1; s <= e.maxVendorId; s++) i.binaryStr += o[s] ? "1" : "0";
    return i.binaryStr
  };
  var c = {
    version: 6,
    created: 36,
    lastUpdated: 36,
    cmpId: 12,
    cmpVersion: 12,
    cmpVersionOld: 6,
    consentScreen: 6,
    consentLanguage: 12,
    vendorListVersion: 12,
    purposesAllowed: 24,
    maxVendorId: 16,
    encodingType: 1,
    numEntries: 12,
    defaultConsent: 1,
    isRange: 1,
    startVendorId: 16,
    endVendorId: 16
  };

  function d() {
    r.call(this, c)
  }
  d.prototype = Object.create(r.prototype), d.prototype.constructor = d, d.prototype.decodeBinary = function(e) {
    var n = this.fieldSizes,
      t = this.decodeSharedFields(e);
    t.purposesAllowed = e.getBits(n.purposesAllowed), t.maxVendorId = e.getBits(n.maxVendorId), t.encodingType = e.getBits(n.encodingType);
    var o = t.maxVendorId,
      i = new Array(o + 1);
    if (t.encodingType == s.BITFIELD_ENCODING) {
      var a = e.string.length - e.atPos;
      if (a < o) throw new Error("Incorrect bitfield size: " + a + " < " + o);
      for (var r = 0; r < o; r++) i[r + 1] = "1" == e.string.charAt(e.atPos + r)
    } else {
      t.defaultConsent = 1 == e.getBits(n.defaultConsent);
      for (r = 0; r < o; r++) i[r + 1] = t.defaultConsent;
      t.numEntries = e.getBits(n.numEntries);
      for (r = 0; r < t.numEntries; r++) {
        var l = 1 == e.getBits(n.isRange),
          u = e.getBits(n.startVendorId),
          c = l ? e.getBits(n.endVendorId) : u;
        if (e.atPos > e.string.length) throw new Error("Not enough bits for numEntries in ranges");
        if (u > c || c > o) throw new Error("Invalid vendorId range: " + u + "-" + c + ". The max valid vendorId is: " + o);
        for (var d = u; d <= c; d++) i[d] = !t.defaultConsent
      }
    }
    return t.vendorConsents = i, t
  }, d.prototype.encodeRanges = function(e) {
    for (var n, t, o = this.fieldSizes, i = new a, s = e.vendorConsents, r = !!s[1], l = !1, u = e.maxVendorId, c = 0, d = 2; d <= u; d++) {
      var p = !!s[d] != !!r;
      if (p && (l || (n = d, l = !0), t = d), l && (!p || d == u)) {
        c++;
        var E = t > n;
        if (i.addField(E ? 1 : 0, o.isRange, "isRange"), i.addField(n, o.startVendorId, "startVendorId"), E && i.addField(t, o.endVendorId, "endVendorId"), 13 + i.binaryStr.length > u) return null;
        l = !1
      }
    }
    return {
      binary: i,
      defaultConsent: r ? 1 : 0,
      numEntries: c
    }
  }, d.prototype.encodeBinary = function(e, n) {
    var t = this.fieldSizes,
      o = e.vendorConsents,
      i = this.encodeSharedFields(e);
    if (n) return i.binaryStr;
    i.addField(e.purposesAllowed, t.purposesAllowed, "purposesAllowed"), i.addField(e.maxVendorId, t.maxVendorId, "maxVendorId");
    var a = this.encodeRanges(e);
    if (e.encodingType = a ? s.RANGES_ENCODING : s.BITFIELD_ENCODING, i.addField(e.encodingType, t.encodingType, "encodingType"), e.encodingType == s.BITFIELD_ENCODING)
      for (var r = 1; r <= e.maxVendorId; r++) i.binaryStr += o[r] ? "1" : "0";
    else e.defaultConsent = a.defaultConsent, e.numEntries = a.numEntries, i.addField(e.defaultConsent, t.defaultConsent, "defaultConsent"), i.addField(e.numEntries, t.numEntries, "numEntries"), i.binaryStr += a.binary.binaryStr;
    return i.binaryStr
  };
  var p = {
    created: 36,
    lastUpdated: 36,
    consentValue: 1
  };

  function E() {
    r.call(this, p)
  }
  E.prototype = Object.create(r.prototype), E.prototype.constructor = E, E.prototype.encodeRanges = function(e) {
    return {
      binary: new a,
      consentValue: e.consentValue ? 1 : 0
    }
  }, E.prototype.encodeBinary = function(e, n) {
    var t = this.fieldSizes,
      o = new a;
    if (o.addField(this.dateToDeciseconds(e.created), t.created, "created"), o.addField(this.dateToDeciseconds(e.lastUpdated), t.lastUpdated, "lastUpdated"), n) return o.binaryStr;
    var i = this.encodeRanges(e);
    return e.consentValue = i.consentValue, o.addField(e.consentValue, t.consentValue, "consentValue"), o.binaryStr += i.binary.binaryStr, o.binaryStr
  }, E.prototype.decodeBinary = function(e) {
    var n = this.fieldSizes;
    return {
      created: this.dateFromDeciseconds(e.getBits(n.created)),
      lastUpdated: this.dateFromDeciseconds(e.getBits(n.lastUpdated)),
      consentValue: e.getBits(n.consentValue)
    }
  };
  var f = function() {
    this.data = new E, this.fields = {}
  };
  n.GoogleConsentAccess = f, f.prototype.getConsentValue = function() {
    return this.fields.consentValue
  }, f.prototype.getCreated = function() {
    return this.fields.created
  }, f.prototype.getLastUpdated = function() {
    return this.fields.lastUpdated
  }, f.prototype.setConsentValue = function(e) {
    this.fields.consentValue = e
  }, f.prototype.initializeFields = function(e) {
    void 0 === this.fields.created && (this.fields.created = new Date), (e || void 0 === this.fields.lastUpdated) && (this.fields.lastUpdated = new Date)
  }, f.prototype.build = function() {
    return this.initializeFields(!0), this.data.build(this.fields, !1)
  };
  var T = {};
  f.prototype.setAll = function(e) {
    var n = !0;
    if (!e) return !1;
    if (T[e]) this.fields = T[e];
    else try {
      this.fields = this.data.setAll(e), T[e] = this.fields
    } catch (t) {
      (0, i.logError)("Error parsing cookie: " + e, t), n = !1
    }
    return n
  }, f.prototype.getMetadata = function(e) {
    return e ? (this.initializeFields(!1), this.data.build(this.fields, !0)) : {
      consentValue: this.fields.consentValue,
      created: this.fields.created,
      lastUpdated: this.fields.lastUpdated
    }
  };
  var _ = {
    created: 36,
    lastUpdated: 36,
    initScreenBodyTextOption: 3
  };

  function g() {
    r.call(this, _)
  }
  g.prototype = Object.create(r.prototype), g.prototype.constructor = g, g.prototype.encodeRanges = function(e) {
    return {
      binary: new a,
      initScreenBodyTextOption: e.initScreenBodyTextOption
    }
  }, g.prototype.encodeBinary = function(e, n) {
    var t = this.fieldSizes,
      o = new a;
    if (o.addField(this.dateToDeciseconds(e.created), t.created, "created"), o.addField(this.dateToDeciseconds(e.lastUpdated), t.lastUpdated, "lastUpdated"), n) return o.binaryStr;
    var i = this.encodeRanges(e);
    return e.initScreenBodyTextOption = i.initScreenBodyTextOption, o.addField(e.initScreenBodyTextOption, t.initScreenBodyTextOption, "initScreenBodyTextOption"), o.binaryStr += i.binary.binaryStr, o.binaryStr
  }, g.prototype.decodeBinary = function(e) {
    var n = this.fieldSizes;
    return {
      created: this.dateFromDeciseconds(e.getBits(n.created)),
      lastUpdated: this.dateFromDeciseconds(e.getBits(n.lastUpdated)),
      initScreenBodyTextOption: e.getBits(n.initScreenBodyTextOption)
    }
  };
  var m = function() {
    this.data = new g, this.fields = {}
  };
  n.RepromptOptionsAccess = m, m.prototype.getInitScreenBodyTextOption = function() {
    return this.fields.initScreenBodyTextOption
  }, m.prototype.getCreated = function() {
    return this.fields.created
  }, m.prototype.getLastUpdated = function() {
    return this.fields.lastUpdated
  }, m.prototype.setInitScreenBodyTextOption = function(e) {
    this.fields.initScreenBodyTextOption = e
  }, m.prototype.initializeFields = function(e) {
    void 0 === this.fields.created && (this.fields.created = new Date), (e || void 0 === this.fields.lastUpdated) && (this.fields.lastUpdated = new Date)
  }, m.prototype.build = function() {
    return this.initializeFields(!0), this.data.build(this.fields, !1)
  };
  var h = {};
  m.prototype.setAll = function(e) {
    var n = !0;
    if (!e) return !1;
    if (h[e]) this.fields = h[e];
    else try {
      this.fields = this.data.setAll(e), h[e] = this.fields
    } catch (t) {
      (0, i.logError)("Error parsing cookie: " + e, t), n = !1
    }
    return n
  }, m.prototype.getMetadata = function(e) {
    return e ? (this.initializeFields(!1), this.data.build(this.fields, !0)) : {
      initScreenBodyTextOption: this.fields.initScreenBodyTextOption,
      created: this.fields.created,
      lastUpdated: this.fields.lastUpdated
    }
  };
  var C = function(e, n) {
    this.data = e, this.fields = n
  };
  n.ConsentAccess = C, C.prototype.getVersion = function() {
    return this.fields.version
  }, C.prototype.getCreated = function() {
    return this.fields.created
  }, C.prototype.getLastUpdated = function() {
    return this.fields.lastUpdated
  }, C.prototype.getCmpId = function() {
    return this.fields.cmpId
  }, C.prototype.getCmpVersion = function() {
    return this.fields.cmpVersion
  }, C.prototype.getConsentScreen = function() {
    return this.fields.consentScreen
  }, C.prototype.setConsentScreen = function(e) {
    this.fields.consentScreen = e
  }, C.prototype.getVendorListVersion = function() {
    return this.fields.vendorListVersion
  }, C.prototype.setVendorListVersion = function(e) {
    this.fields.vendorListVersion = e
  }, C.prototype._setPurposeConsent = function(e, n, t) {
    var o = 1 << this.data.fieldSizes[t] - n;
    this.fields[t] = e ? this.fields[t] | o : this.fields[t] & ~o
  }, C.prototype._getPurposeConsent = function(e, n) {
    var t = this.data.fieldSizes;
    if (e) {
      var o = 1 << t[n] - e;
      return 0 != (this.fields[n] & o)
    }
    for (var i = {}, s = 1; s < t[n] + 1; s++) {
      o = 1 << t[n] - s;
      i[s] = 0 != (this.fields[n] & o)
    }
    return i
  }, C.prototype.initializeFields = function(e) {
    (e || void 0 === this.fields.version) && (this.fields.version = o.CONSENT_STRING_VERSION), (e || void 0 === this.fields.cmpId) && (this.fields.cmpId = s.CMP_ID), (e || void 0 === this.fields.cmpVersion) && (this.fields.cmpVersion = isNaN("30") ? parseInt("30") : "30"), void 0 === this.fields.created && (this.fields.created = new Date), (e || void 0 === this.fields.lastUpdated) && (this.fields.lastUpdated = new Date)
  }, C.prototype.build = function() {
    return this.initializeFields(!0), this.data.build(this.fields, !1)
  };
  var N = {};
  C.prototype.setAll = function(e) {
    var n = !0;
    if (!e) return !1;
    if (N[e]) this.fields = N[e];
    else try {
      this.fields = this.data.setAll(e), N[e] = this.fields
    } catch (t) {
      (0, i.logError)("Error parsing cookie: " + e, t), n = !1
    }
    return n
  }, C.prototype.getMetadata = function(e) {
    return e ? (this.initializeFields(!1), this.data.build(this.fields, !0)) : {
      version: this.fields.version,
      created: this.fields.created,
      lastUpdated: this.fields.lastUpdated,
      cmpId: this.fields.cmpId,
      cmpVersion: this.fields.cmpVersion,
      consentScreen: this.fields.consentScreen,
      consentLanguage: this.fields.consentLanguage,
      vendorListVersion: this.fields.vendorListVersion
    }
  };
  var v = function() {
    C.call(this, new d, {
      vendorConsents: []
    })
  };
  n.VendorConsentAccess = v, (v.prototype = Object.create(C.prototype)).constructor = v, v.prototype.setPurposeConsent = function(e, n) {
    this._setPurposeConsent(e, n, "purposesAllowed")
  }, v.prototype.getPurposeConsent = function(e) {
    return this._getPurposeConsent(e, "purposesAllowed")
  }, v.prototype.getMaxVendorId = function(e) {
    return this.fields.maxVendorId
  }, v.prototype.setMaxVendorId = function(e) {
    this.fields.maxVendorId = e
  }, v.prototype.getVendorConsent = function(e) {
    if (!(e > this.fields.maxVendorId)) return e ? !!this.fields.vendorConsents[e] : this.fields.vendorConsents
  }, v.prototype.setVendorConsent = function(e, n) {
    this.fields.vendorConsents[n] = !!e
  };
  var O = function() {
    C.call(this, new u, {
      vendorConsents: []
    })
  };
  n.NonIabVendorConsentAccess = O, (O.prototype = Object.create(C.prototype)).constructor = O, O.prototype.getMaxVendorId = function(e) {
    return this.fields.maxVendorId
  }, O.prototype.setMaxVendorId = function(e) {
    this.fields.maxVendorId = e
  }, O.prototype.getVendorConsent = function(e) {
    return !(e > this.fields.maxVendorId) && (e ? !!this.fields.vendorConsents[e] : this.fields.vendorConsents)
  }, O.prototype.setVendorConsent = function(e, n) {
    this.fields.vendorConsents[n] = !!e
  };
  var I = {
    version: 6,
    created: 36,
    lastUpdated: 36,
    cmpId: 12,
    cmpVersion: 12,
    cmpVersionOld: 6,
    consentScreen: 6,
    consentLanguage: 12,
    vendorListVersion: 12,
    publisherPurposesVersion: 12,
    standardPurposesAllowed: 24,
    numberCustomPurposes: 6
  };

  function S() {
    r.call(this, I)
  }
  S.prototype = Object.create(r.prototype), S.prototype.constructor = S, S.prototype.decodeBinary = function(e) {
    var n = this.fieldSizes,
      t = this.decodeSharedFields(e);
    t.publisherPurposesVersion = e.getBits(n.publisherPurposesVersion), t.standardPurposesAllowed = e.getBits(n.standardPurposesAllowed), t.numberCustomPurposes = e.getBits(n.numberCustomPurposes);
    for (var o = new Array(t.numberCustomPurposes + 1), i = 0; i < t.numberCustomPurposes; i++) o[i + 1] = "1" == e.string.charAt(e.atPos + i);
    return t.customPurposeConsents = o, t
  }, S.prototype.encodeBinary = function(e, n) {
    var t = this.fieldSizes,
      o = this.encodeSharedFields(e);
    if (o.addField(e.publisherPurposesVersion, t.publisherPurposesVersion, "publisherPurposesVersion"), n) return o.binaryStr;
    o.addField(e.standardPurposesAllowed, t.standardPurposesAllowed, "standardPurposesAllowed"), o.addField(e.numberCustomPurposes, t.numberCustomPurposes, "numberCustomPurposes");
    for (var i = 1; i <= e.numberCustomPurposes; i++) o.binaryStr += e.customPurposeConsents[i] ? "1" : "0";
    return o.binaryStr
  };
  var y = function() {
    C.call(this, new S, {
      customPurposeConsents: []
    })
  };
  n.PublisherConsentAccess = y, (y.prototype = Object.create(C.prototype)).constructor = y, y.prototype.setStandardPurposeConsent = function(e, n) {
    this._setPurposeConsent(e, n, "standardPurposesAllowed")
  }, y.prototype.getStandardPurposeConsent = function(e) {
    return this._getPurposeConsent(e, "standardPurposesAllowed")
  }, y.prototype.getNumberCustomPurposes = function() {
    return this.fields.numberCustomPurposes
  }, y.prototype.setNumberCustomPurposes = function(e) {
    this.fields.numberCustomPurposes = e
  }, y.prototype.setCustomPurposeConsent = function(e, n) {
    this.fields.customPurposeConsents[n] = !!e
  }, y.prototype.getCustomPurposeConsent = function(e) {
    return !!this.fields.customPurposeConsents[e]
  }
}, function(e, n, t) {
  "use strict";
  Object.defineProperty(n, "__esModule", {
    value: !0
  }), n.default = void 0;
  var o = t(2),
    i = t(0),
    s = t(4),
    a = t(1),
    r = t(3),
    l = t(0),
    u = null,
    c = null,
    d = window.localStorage,
    p = {},
    E = {},
    f = {},
    T = !1,
    _ = !1,
    g = void 0,
    m = function(e) {
      var n = !1;
      switch (e) {
        case "firefox":
          n = navigator.userAgent.toLowerCase().indexOf(e) > -1;
          break;
        case "safari":
          n = navigator.userAgent.toLowerCase().indexOf(e) > -1 && -1 === navigator.userAgent.toLowerCase().indexOf("chrome")
      }
      return n
    },
    h = m("firefox"),
    C = m("safari"),
    N = !1,
    v = !1,
    O = !1,
    I = function(e, n, t, o) {
      if (n && n.trim()) {
        n = n.trim();
        var i = y(n);
        !i.isNonGDPRCookie && !i.isRepromptOptionsCookie || O ? T && !i.isGlobalGroupVendorCookie && !i.isNonGroupConsent || v && !O ? B("set", n, t, o) : null != e && "" !== e || O ? k(e, n, t, o) : L(n, t, o) : T ? B("set", n, t, o) : L(n, t, o)
      } else "function" == typeof o && o({
        status: "error",
        message: "Cookie name cannot be empty"
      }, !1)
    },
    S = function(e, n, t) {
      if (n && n.trim())
        if (n = n.trim(), void 0 == p[n]) {
          var o = y(n);
          if (!o.isNonGDPRCookie && !o.isRepromptOptionsCookie || O)
            if (T && !o.isGlobalGroupVendorCookie && !o.isNonGroupConsent || v && !O) B("get", n, void 0, t);
            else {
              if (!(null != e && "" !== e || O)) return b(n, t);
              P(e, n, t)
            }
          else {
            if (!T) return b(n, t);
            B("get", n, void 0, t)
          }
        } else "function" == typeof t && t(p[n], !0);
      else "function" == typeof t && t({
        status: "error",
        message: "Cookie name cannot be empty"
      }, !1)
    },
    y = function(e) {
      var n = (0, o.getConfig)("internal");
      return {
        isNonGroupConsent: "service" === n.consentScope || "global" === n.consentScope,
        isGlobalGroupVendorCookie: e === a.VENDOR_CONSENT_COOKIE_NAME && "global group" === n.consentScope,
        isNonGDPRCookie: e === a.GOOGLE_CONSENT_COOKIE_NAME || e === a.NONIABVENDOR_CONSENT_COOKIE_NAME || e === a.USP_COOKIE_NAME,
        isRepromptOptionsCookie: e === a.REPROMPT_OPTIONS_COOKIE_NAME
      }
    },
    L = function(e, n, t) {
      if (e && e.trim()) {
        e = e.trim();
        var i = new Date(Date.now() + 1e3 * a.COOKIE_MAX_AGE).toUTCString(),
          s = (0, o.getConfig)("internal");
        document.cookie = e + "=" + n + ";path=" + s.cookiePath + ";max-age=" + a.COOKIE_MAX_AGE + ";expires=" + i + ";domain=" + s.cookieDomain + ("https:" === window.location.protocol ? ";SameSite=Lax;secure" : ""), p[e] = {
          value: n,
          status: "found"
        }, (0, r.logSetCookieEvent)({
          type: a.COOKIE_TYPE.FIRST_PARTY,
          name: e,
          value: n
        }), "function" == typeof t && t(p[e], !0)
      } else "function" == typeof t && t({
        status: "error",
        message: "empty cookie name"
      }, !1)
    },
    b = function(e, n) {
      if (e && e.trim()) {
        e = e.trim();
        var t = document.cookie.split(";").filter(function(n) {
            return n.trim().startsWith(e + "=")
          }).map(function(n) {
            return n.trim().substring(e.length + 1)
          }),
          o = A(e, t);
        return p[e] = {
          value: o,
          status: o ? "found" : "notfound"
        }, "function" == typeof n && n(p[e], !0), p[e]
      }
      "function" == typeof n && n({
        status: "error",
        message: "empty cookie name"
      }, !1)
    },
    A = function(e, n) {
      var t;
      if ((0, i.isArray)(n) && 0 !== n.length) {
        if (e === a.VENDOR_CONSENT_COOKIE_NAME) t = s.VendorConsentAccess;
        else if (e === a.NONIABVENDOR_CONSENT_COOKIE_NAME) t = s.NonIabVendorConsentAccess;
        else if (e === a.PUBLISHER_CONSENT_COOKIE_NAME) t = s.PublisherConsentAccess;
        else if (e === a.GOOGLE_CONSENT_COOKIE_NAME) t = s.GoogleConsentAccess;
        else {
          if (e !== a.REPROMPT_OPTIONS_COOKIE_NAME) return e === a.BLOCKED_HASH_COOKIE_NAME || e === a.NON_IAB_HASH_COOKIE_NAME || e === a.USP_COOKIE_NAME ? n[0] : void 0;
          t = s.RepromptOptionsAccess
        }
        for (var o, r, l = 0; l < n.length; l++) {
          var u = new t,
            c = n[l];
          if (u.setAll(c)) {
            var d = u.getLastUpdated();
            (void 0 === o || d > o) && (o = d, r = c)
          }
        }
        return r
      }
    },
    k = function(e, n, t, i) {
      var s = !0;
      if ((0, o.getConfig)("internal").testMode && (n !== a.VENDOR_CONSENT_COOKIE_NAME || v) && (s = !1), e && n && n.trim()) {
        n = n.trim();
        var l = new XMLHttpRequest;
        l.onreadystatechange = function() {
          R(n, t, l, i)
        }, l.open("POST", e), l.setRequestHeader("Content-Type", "application/json"), l.withCredentials = s;
        var u = {};
        u[n] = t, l.send(JSON.stringify(u)), (0, r.logSetCookieEvent)({
          type: a.COOKIE_TYPE.THIRD_PARTY,
          name: n,
          value: t
        })
      } else "function" == typeof i && i({
        status: "error",
        message: "Could not set cookie for " + n + " using api : " + e
      }, !1)
    },
    P = function(e, n, t) {
      var s = !0;
      (0, o.getConfig)("internal").testMode && (n !== a.VENDOR_CONSENT_COOKIE_NAME || v) && (s = !1), e && n && n.trim() ? (n = n.trim(), E[n] ? E[n].push(t) : (E[n] = new i.CallbackArray, E[n].push(t), (0, i.getJson)({
        url: e,
        withCredentials: s
      }, function(e) {
        V(n, e, function(e, t) {
          E[n].call(e, t), E[n] = void 0
        })
      }))) : "function" == typeof t && t({
        status: "error",
        message: "Could not get cookie for " + n + " using api : " + e
      }, !1)
    },
    R = function(e, n, t, o) {
      if (4 === t.readyState) {
        var i, s = !0;
        if (200 === t.status ? i = p[e] = {
            value: n,
            status: "found"
          } : ((0, l.logWarning)("Setting cookie for " + e + " with value " + n + " failed with httpRequest status", t.status), i = {
            status: "error"
          }, s = !1), 404 === t.status) return !1;
        "function" == typeof o && o(i, s)
      }
    },
    V = function(e, n, t) {
      if (4 === n.readyState) {
        var o, s = !0;
        if (200 === n.status) {
          var a = {};
          if ("string" == typeof n.response) try {
            a = JSON.parse(n.response)
          } catch (e) {
            (0, i.logError)("error parsing cookie response", e)
          } else a = n.response;
          a ? o = a[e] ? p[e] = {
            value: a[e],
            status: "found"
          } : p[e] = {
            value: null,
            status: "notfound"
          } : (o = p[e] = {
            value: void 0,
            status: "error"
          }, s = !1)
        } else 404 === n.status ? o = p[e] = {
          value: null,
          status: "notfound"
        } : ((0, i.logError)("error fetching cookie response for " + e + " with status ", n.status), o = p[e] = {
          value: void 0,
          status: "error"
        }, s = !1);
        "function" == typeof t && t(o, s)
      }
    },
    B = function e(n, t, o, i) {
      _ ? U(n, t, o, i) : setTimeout(function() {
        e(n, t, o, i)
      }, a.COOKIE_ACCESS_IFRAME_TIMEOUT)
    },
    U = function(e, n, t, i) {
      var s = Math.random().toString(),
        r = {
          callId: s,
          __qcCmpCookieAccessCall: {
            cmd: e,
            cookieName: n
          }
        },
        l = (0, o.getConfig)("internal");
      if ("set" === e) {
        f[s] = {
          cb: i,
          cookieName: n,
          cookieValue: t
        };
        var u = new Date(Date.now() + 1e3 * a.COOKIE_MAX_AGE).toUTCString();
        r.__qcCmpCookieAccessCall.cookieValue = t, r.__qcCmpCookieAccessCall.cookiePath = l.cookiePath, r.__qcCmpCookieAccessCall.expires = u, p[n] = {
          value: t,
          status: "found"
        }
      } else f[s] = {
        cb: i,
        cookieName: n
      };
      g.contentWindow.postMessage(r, "*")
    },
    D = function(e, n) {
      var t = document.body,
        o = document.createElement("iframe");
      o.src = e, o.style.display = "none", o.id = n, t.appendChild(o), g = o
    },
    w = function(e) {
      var n, t = "string" == typeof e.data,
        s = (0, o.getConfig)("internal");
      if ((n = t ? -1 !== e.data.indexOf("__qcCmpCookieAccessReturn") ? JSON.parse(e.data) : {} : e.data).__qcCmpCookieAccessReturn) {
        if (n.__qcCmpCookieAccessReturn.isHandlerRegistered) return void(_ = !0);
        var l = n.__qcCmpCookieAccessReturn,
          u = f[n.callId];
        if (u.cb) {
          if ("get" === l.cmd) {
            if (-1 !== ["euconsent", "eupubconsent", "googlepersonalization", "noniabvendorconsent"].indexOf(u.cookieName)) {
              var c = l.isSuccess ? A(u.cookieName, l.cookies) : null;
              p[u.cookieName] = {
                value: c,
                status: l.isSuccess && c ? "found" : "notfound"
              }
            } else p[u.cookieName] = l.cookies;
            var d = !!p[u.cookieName] && Object.keys(p[u.cookieName]).length > 0;
            (0, i.doCallback)(u.cb, p[u.cookieName], d)
          } else(0, i.doCallback)(u.cb, p[u.cookieName], !0);
          delete f[n.callId]
        }(0, r.logSetCookieEvent)({
          type: a.COOKIE_TYPE.GROUP,
          name: u.cookieName,
          value: u.cookieValue,
          cookieDomain: s.cookieDomain
        })
      }
    },
    z = function(e, n, t, i) {
      var s = (0, o.getConfig)("internal");
      try {
        d.setItem(e, n), "function" == typeof t && t(d.getItem(e), null !== d.getItem(e) && "" !== d.getItem(e)), i && (document.cookie = e + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; max-age=-1; domain=" + s.cookieDomain)
      } catch (o) {
        I(null, e, n, t)
      }
    },
    X = function(e, n) {
      var t = d.getItem(e),
        i = S(null, e, null),
        s = (0, o.getConfig)("internal");
      return null === t && (void 0 === i || i && "notfound" === i.status) ? ("function" == typeof n && n(null, !1), null) : (t && "function" == typeof n ? (i && i.value && (document.cookie = e + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; max-age=-1; domain=" + s.cookieDomain), n(t, null !== t && "" !== t)) : !t && i.value || t && i.value ? z(e, i.value, n, !0) : "function" == typeof n && n(null, !1), t || i.value)
    },
    j = {
      isGlobalScope: !1,
      cookie: p,
      setPublisherConsentCookie: function(e, n) {
        e && e.trim() ? I(c, a.PUBLISHER_CONSENT_COOKIE_NAME, e, n) : "function" == typeof n && n({
          status: "error",
          message: "cannot set empty publisher purpose cookie value"
        }, !1)
      },
      fetchPublisherConsentCookie: function(e) {
        S(c, a.PUBLISHER_CONSENT_COOKIE_NAME, e)
      },
      setVendorConsentCookie: function(e, n) {
        e && e.trim() ? I(u, a.VENDOR_CONSENT_COOKIE_NAME, e, n) : "function" == typeof n && n({
          status: "error",
          message: "cannot set empty vendor purpose cookie value"
        }, !1)
      },
      fetchVendorConsentCookie: function(e) {
        S(u, a.VENDOR_CONSENT_COOKIE_NAME, e)
      },
      setGoogleConsentCookie: function(e, n) {
        e && e.trim() ? I(O ? c : null, a.GOOGLE_CONSENT_COOKIE_NAME, e, n) : "function" == typeof n && n({
          status: "error",
          message: "cannot set empty google consent cookie value"
        }, !1)
      },
      setNonIabVendorCookie: function(e, n) {
        e && e.trim() ? I(O ? c : null, a.NONIABVENDOR_CONSENT_COOKIE_NAME, e, n) : "function" == typeof n && n({
          status: "error",
          message: "cannot set nonIabVendor consent cookie value"
        }, !1)
      },
      fetchGoogleConsentCookie: function(e) {
        S(O ? c : null, a.GOOGLE_CONSENT_COOKIE_NAME, e)
      },
      fetchNonIabConsentCookie: function(e) {
        S(O ? c : null, a.NONIABVENDOR_CONSENT_COOKIE_NAME, e)
      },
      setNonIabVendorsHashValue: function(e, n) {
        e && e.trim() ? T ? B("set", a.NON_IAB_HASH_COOKIE_NAME, e, n) : O ? I(c, a.NON_IAB_HASH_COOKIE_NAME, e, n) : z(a.NON_IAB_HASH_COOKIE_NAME, e, n) : "function" == typeof n && n({
          status: "error",
          message: "cannot set empty vendor hash cookie value"
        }, !1)
      },
      fetchNonIabVendorsHashValue: function(e) {
        T ? B("get", a.NON_IAB_HASH_COOKIE_NAME, void 0, e) : O ? S(c, a.NON_IAB_HASH_COOKIE_NAME, e) : X(a.NON_IAB_HASH_COOKIE_NAME, e)
      },
      setBlockedVendorsHashValue: function(e, n) {
        e && e.trim() ? T ? B("set", a.BLOCKED_HASH_COOKIE_NAME, e, n) : O ? I(c, a.BLOCKED_HASH_COOKIE_NAME, e, n) : z(a.BLOCKED_HASH_COOKIE_NAME, e, n) : "function" == typeof n && n({
          status: "error",
          message: "cannot set empty vendor hash cookie value"
        }, !1)
      },
      fetchBlockedVendorsHashValue: function(e) {
        T ? B("get", a.BLOCKED_HASH_COOKIE_NAME, void 0, e) : O ? S(c, a.BLOCKED_HASH_COOKIE_NAME, e) : X(a.BLOCKED_HASH_COOKIE_NAME, e)
      },
      setRepromptOptionsValue: function(e, n) {
        e && e.trim() ? T ? B("set", a.REPROMPT_OPTIONS_COOKIE_NAME, e, n) : O ? I(c, a.REPROMPT_OPTIONS_COOKIE_NAME, e, n) : z(a.REPROMPT_OPTIONS_COOKIE_NAME, e, n) : "function" == typeof n && n({
          status: "error",
          message: "cannot set empty reprompt consent cookie value"
        }, !1)
      },
      fetchRepromptOptionsValue: function(e) {
        T ? B("get", a.REPROMPT_OPTIONS_COOKIE_NAME, void 0, e) : O ? S(c, a.REPROMPT_OPTIONS_COOKIE_NAME, e) : X(a.REPROMPT_OPTIONS_COOKIE_NAME, e)
      },
      setUspCookie: function(e, n) {
        e && e.trim() ? L(a.USP_COOKIE_NAME, e, n) : "function" == typeof n && n({
          status: "error",
          message: "cannot set empty U.S. Privacy cookie value"
        }, !1)
      },
      fetchUSPrivacyCookie: function(e) {
        b(a.USP_COOKIE_NAME, e)
      },
      init: function(e, n) {
        if (e && ((C || h) && (u = null, c = null, this.isGlobalScope = !1, N = !0), e.groupCookieAccessHostUrl && !N && (T = !0, window.addEventListener ? window.addEventListener("message", w, !1) : window.attachEvent("onmessage", w), D(e.groupCookieAccessHostUrl, a.COOKIE_ACCESS_IFRAME_ID)), n && !N)) {
          var t = T || e.consentScopeGroupURL && "" !== e.consentScopeGroupURL,
            o = e.groupCookieAccessHostUrl || e.consentScopeGroupURL;
          switch (O = !T && e.consentScopeGroupURL && "" !== e.consentScopeGroupURL, e.consentScope) {
            case "global group":
              "" === e.publisherVendorListUrl ? (u = "https://api.quantcast.mgr.consensu.org/CookieAccess", this.isGlobalScope = !0) : t ? (u = o, this.isGlobalScope = !1, v = !0) : (u = null, this.isGlobalScope = !1), c = t ? o : null;
              break;
            case "global":
              "" === e.publisherVendorListUrl ? (u = "https://api.quantcast.mgr.consensu.org/CookieAccess", this.isGlobalScope = !0) : (u = null, this.isGlobalScope = !1), c = null;
              break;
            case "service group":
              t ? (u = c = o, v = !0) : u = c = null, this.isGlobalScope = !1;
              break;
            case "service":
            default:
              u = null, c = null, this.isGlobalScope = !1
          }
        }
      }
    };
  n.default = j
}, function(e, n, t) {
  "use strict";
  Object.defineProperty(n, "__esModule", {
    value: !0
  }), n.default = void 0;
  var o = t(0),
    i = u(t(2)),
    s = u(t(5)),
    a = t(4),
    r = t(1),
    l = u(t(9));

  function u(e) {
    return e && e.__esModule ? e : {
      default: e
    }
  }
  var c = {
      cachedVendorLists: {},
      cachedVendorIdMap: {},
      cachedNonIabVendorList: [],
      cachedPublisherVendorList: void 0,
      blockedVendorsHash: "",
      nonIabVendorsHash: "",
      latestVendors: [],
      vendorListCallbacks: {},
      vendorListResponseHandler: function(e, n, t, o) {
        try {
          if (4 === e.readyState) {
            if (200 !== e.status) throw "cannot fetch the vendor list";
            t(e.response ? "string" == typeof e.response ? JSON.parse(e.response) : e.response : JSON.parse(e.responseText))
          }
        } catch (e) {
          o(n)
        }
      },
      mergeVendorList: function(e) {
        for (var n = c.cachedPublisherVendorList.vendors, t = c.getVendorIdMap(e), o = [], i = 0; i < n.length; i++) {
          var s = t[n[i].id.toString()];
          s && o.push(s)
        }
        return o
      },
      getVendorIdMap: function(e) {
        if (c.cachedVendorIdMap[e.vendorListVersion]) return c.cachedVendorIdMap[e.vendorListVersion];
        for (var n, t = {}, o = e.vendors, i = 0; i < o.length; i++) {
          var s = o[i].id;
          (void 0 === n || s > n) && (n = s), t[s] = o[i]
        }
        return t.max = n, c.cachedVendorIdMap[e.vendorListVersion] = t, t
      },
      getNonIabVendorIdMax: function(e) {
        for (var n, t = 0; t < e.length; t++) {
          var o = e[t].vendorId;
          (void 0 === n || o > n) && (n = o)
        }
        return n
      },
      retrieveVendorList: function(e, n, t) {
        if (this.cachedVendorLists[n]) t(this.cachedVendorLists[n], !0);
        else if (this.vendorListCallbacks[n] && this.vendorListCallbacks[n].size() > 0) this.vendorListCallbacks[n].push(t);
        else {
          this.vendorListCallbacks[n] = new o.CallbackArray, this.vendorListCallbacks[n].push(t);
          var i = e.replace("/VERSION", "LATEST" === n ? "" : "/v-" + n);
          c.fetchGlobalVendorList(i, n)
        }
      },
      fetchGlobalVendorList: function(e, n) {
        (0, o.getJson)({
          url: e
        }, function(e) {
          c.vendorListResponseHandler(e, n, function(e) {
            e.vendors = c.sortVendorList(e.vendors);
            var t = c.getVendorIdMap(e);
            c.cachedVendorIdMap[n] = t, c.cachedVendorLists[n] = e, l.default.setPurposeList(r.DEFAULT_LANGUAGE, {
              purposes: e.purposes,
              features: e.features
            }), "LATEST" === n && (c.latestVendors = e.vendors), "" !== i.default.publisherVendorListUrl ? c.fetchPublisherVendorList(n) : c.vendorListCallbacks[n].call(c.cachedVendorLists[n], !0)
          }, function(n) {
            c.vendorListCallbacks[n].call({
              status: "Exception caught when parsing & handling global vendor list." + e.responseURL
            }, !1)
          })
        })
      },
      fetchPublisherVendorList: function(e) {
        if (void 0 === c.cachedPublisherVendorList)(0, o.getJson)({
          url: i.default.publisherVendorListUrl
        }, function(n) {
          c.vendorListResponseHandler(n, e, function(n) {
            c.cachedPublisherVendorList = n;
            var t = c.mergeVendorList(c.cachedVendorLists[e]);
            c.cachedVendorLists[e].vendors = c.sortVendorList(t), n.blockedVendorsHash && "" !== n.blockedVendorsHash && (c.blockedVendorsHash = n.blockedVendorsHash), c.vendorListCallbacks[e].call(c.cachedVendorLists[e], !0)
          }, function(n) {
            c.vendorListCallbacks[n].call(c.cachedVendorLists[e], !0)
          })
        });
        else {
          var n = c.mergeVendorList(c.cachedVendorLists[e]);
          c.cachedVendorLists[e].vendors = c.sortVendorList(n), c.vendorListCallbacks[e].call(c.cachedVendorLists[e], !0)
        }
      },
      fetchNonIabVendorList: function(e, n) {
        "" !== i.default.nonIabVendorListUrl ? 0 === c.cachedNonIabVendorList.length ? (0, o.getJson)({
          url: i.default.nonIabVendorListUrl
        }, function(t) {
          c.vendorListResponseHandler(t, e, function(e) {
            "nonIabVendorList" in e && e.nonIabVendorList.length && (c.cachedNonIabVendorList = e.nonIabVendorList, e.nonIabVendorsHash && "" !== e.nonIabVendorsHash && (c.nonIabVendorsHash = e.nonIabVendorsHash)), c.cachedNonIabVendorList = c.sortVendorList(c.cachedNonIabVendorList), n(c.cachedNonIabVendorList, c.cachedNonIabVendorList.length > 0)
          })
        }) : n(c.cachedNonIabVendorList, c.cachedNonIabVendorList.length > 0) : n(void 0, !1)
      },
      getVendorList: function(e, n) {
        null === e || void 0 === e ? s.default.fetchVendorConsentCookie(function(e) {
          var t = "LATEST";
          if (e && "found" === e.status) {
            var o = new a.VendorConsentAccess;
            o.setAll(e.value) && (t = o.getVendorListVersion(), c.isBetaVendorListVersion(o) && (t = "LATEST"))
          }
          c.retrieveVendorList("https://vendorlist.consensu.org/VERSION/vendorlist.json", t, n)
        }) : "number" == typeof e || "LATEST" === e ? c.retrieveVendorList("https://vendorlist.consensu.org/VERSION/vendorlist.json", e, n) : n({
          error: "Requesting invalid version: " + e
        }, !1)
      },
      getNonIabVendorList: function(e) {
        c.fetchNonIabVendorList("LATEST", e)
      },
      isBlockedVendorsHashUpdated: function(e) {
        i.default.pCode && s.default.fetchBlockedVendorsHashValue(function(n, t) {
          if (n && t) {
            var s = "string" != typeof n ? n.value : n;
            (0, o.getJson)({
              url: i.default.publisherVendorListUrl
            }, function(n) {
              c.vendorListResponseHandler(n, "LATEST", function(n) {
                n.blockedVendorsHash && "" !== n.blockedVendorsHash && n.blockedVendorsHash !== s ? (c.blockedVendorsHash = n.blockedVendorsHash, "function" == typeof e && e()) : c.blockedVendorsHash = s
              }, function(e) {
                c.blockedVendorsHash = s
              })
            })
          } else console.log("BLOCKED VENDORS HASH NOT FOUND"), "function" == typeof e && e()
        })
      },
      isNonIabVendorsHashUpdated: function(e) {
        i.default.pCode && s.default.fetchNonIabVendorsHashValue(function(n, t) {
          if (n && t) {
            var s = "string" != typeof n ? n.value : n;
            (0, o.getJson)({
              url: i.default.nonIabVendorListUrl
            }, function(n) {
              c.vendorListResponseHandler(n, "LATEST", function(n) {
                n.nonIabVendorsHash && "" !== n.nonIabVendorsHash && n.nonIabVendorsHash !== s ? (c.nonIabVendorsHash = n.nonIabVendorsHash, "function" == typeof e && e()) : c.nonIabVendorsHash = s
              }, function(e) {
                c.nonIabVendorsHash = s
              })
            })
          } else console.log("NON-IAB VENDORS HASH NOT FOUND"), "function" == typeof e && e()
        })
      },
      shouldUpdateVendorList: function(e) {
        return Date.now() - e > i.default.vendorListUpdateFreq * o.MILLISEC_DAY
      },
      isBetaVendorListVersion: function(e) {
        return e.getMaxVendorId() == r.BETA_MAX_VENDOR_ID
      },
      sortVendorList: function(e) {
        return e.sort(function(e, n) {
          var t = e.name.toLowerCase(),
            o = n.name.toLowerCase();
          return t < o ? -1 : t > o ? 1 : 0
        }), e
      }
    },
    d = c;
  n.default = d
}, function(e, n, t) {
  "use strict";
  Object.defineProperty(n, "__esModule", {
    value: !0
  }), n.TRANSLATIONS = n.getTranslationOrDefault = n.QC_SUPPORTED_LANGUAGES = n.IAB_SUPPORTED_LANGUAGES = void 0;
  var o = t(1);
  n.IAB_SUPPORTED_LANGUAGES = ["bg", "cs", "da", "de", "el", "en", "es", "et", "fi", "fr", "ga", "hr", "hu", "it", "lt", "lv", "mt", "nl", "no", "pl", "pt", "ro", "sk", "sl", "sv"];
  n.QC_SUPPORTED_LANGUAGES = ["da", "de", "el", "en", "es", "fi", "fr", "hu", "it", "nl", "no", "pl", "pt", "ro", "sk", "sv", "ru", "ar", "fa"];
  n.getTranslationOrDefault = function(e, n) {
    return i[e] && i[e][n] ? i[e][n] : i[o.DEFAULT_LANGUAGE][n]
  };
  var i = {
    en: {
      INIT_SCREEN_TITLE_TEXT: "We value your privacy",
      INIT_SCREEN_BODY_TEXT: {
        1: "We and our partners use technologies, such as cookies, and process personal data, such as IP addresses and cookie identifiers, to personalise ads and content based on your interests, measure the performance of ads and content, and derive insights about the audiences who saw ads and content. Click below to consent to the use of this technology and the processing of your personal data for these purposes. You can change your mind and change your consent choices at any time by returning to this site.",
        2: "We and our partners process your personal data, such as IP addresses and cookie identifiers, using technology such as cookies in order to personalise ads and content based on your interests, measure the performance of ads and content, and derive insights about the audiences who saw ads and content. Click below to consent or to choose which Partners process your data and for what Purposes. You can make changes to your settings at any time.",
        3: "The quality content and information we provide to you depends on the revenue we generate from advertising. We and our partners use your personal data, such as IP addresses and cookie identifiers, in order to personalise ads and content based on your interests, measure the performance of ads and content, and derive insights about the audiences who saw ads and content. Click below to consent to the use of cookies and the processing of your data. You can revisit your choices at any time.",
        softOptIn: "We and our partners use technologies, such as cookies, and process personal data, such as IP addresses and cookie identifiers, to personalise ads and content based on your interests, measure the performance of ads and content, and derive insights about the audiences who saw ads and content. Continue using this website or click below to consent to the use of this technology and the processing of your personal data for these purposes. You can change your mind and change your consent choices at any time by returning to this site."
      },
      INIT_SCREEN_SETTINGS_BUTTON_TEXT: "MORE OPTIONS",
      INIT_SCREEN_REJECT_BUTTON_TEXT: "I do not accept",
      INIT_SCREEN_ACCEPT_BUTTON_TEXT: "I accept",
      INIT_SCREEN_PURPOSE_LINK_TEXT: "Show Purposes",
      INIT_SCREEN_ATTRIBUTION_TEXT: "Powered by",
      PURPOSE_SCREEN_TITLE_TEXT: "We value your privacy",
      PURPOSE_SCREEN_BODY_TEXT: "You can set your consent preferences and determine how you want your data to be used based on the purposes below. You may set your preferences for us independently from those of third-party partners. Each purpose has a description so that you know how we and partners use your data.",
      PURPOSE_SCREEN_VENDOR_LINK_TEXT: "See Vendors",
      PURPOSE_SCREEN_CANCEL_BUTTON_TEXT: "Cancel",
      PURPOSE_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "Save & Exit",
      VENDOR_SCREEN_TITLE_TEXT: "We value your privacy",
      VENDOR_SCREEN_BODY_TEXT: "You can set consent preferences for individual third-party partners we work with below. Expand each company list item to see what purposes they use data for to help make your choices. In some cases, companies may use your data without asking for your consent, based on their legitimate interests. You can click on their privacy policy links for more information and to object to such processing.",
      REJECT_ALL_BUTTON_TEXT: "Reject all",
      ACCEPT_ALL_BUTTON_TEXT: "Accept all",
      VENDOR_SCREEN_PURPOSES_LINK_TEXT: "Back to Purposes",
      VENDOR_SCREEN_CANCEL_BUTTON_TEXT: "Cancel",
      VENDOR_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "Save & Exit",
      CONSENT_LINK_LABEL: "Privacy",
      BACK_LABEL: "Back",
      VIEW_COMPANIES_LABEL: "View Companies",
      HIDE_COMPANIES_LABEL: "Hide Companies",
      THIRD_PARTY_VENDORS_LABEL: "Third Party Vendors",
      ON_LABEL: "On",
      OFF_LABEL: "Off",
      OFF_ON_LABEL: "Off/On",
      OTHER: "Other",
      COMPANY_LABEL: "Company",
      NON_IAB_TITLE: "Non-IAB Vendors",
      DESCRIPTION: "Vendor Description:",
      REQUIRED_LABEL: "Required",
      PRIVACY_POLICY_LABEL: "Privacy Policy: ",
      PURPOSES_LABEL: "Purposes (Consent)",
      FEATURES_LABEL: "Features",
      LEGITIMATE_INTEREST_PURPOSES_LABEL: "Purposes (Legitimate Interests)",
      SOFT_OPT_IN_ALERT_TITLE_TEXT: "Your consent preferences have been saved.",
      SOFT_OPT_IN_ALERT_BODY_TEXT: "To withdraw your consent or change your preferences, please click on the <strong>Privacy</strong> button.",
      GOOGLE_PURPOSES_TEXT: "Allow Google and their technology partners to collect data and use cookies for ad personalisation and measurement.",
      USP_DNS_TITLE: "Do Not Sell My Data",
      USP_DNS_BODY_TEXT: "We, and our partners, use technologies to process personal     information, including IP addresses, pseudonymous identifiers associated     with cookies, and in some cases mobile ad IDs. This information is processed     to personalize content based on your interests, run and optimize marketing     campaigns, measure the performance of ads and content, and derive insights     about the audiences who engage with ads and content. This data is an integral     part of how we operate our site, make revenue to support our staff, and generate     relevant content for our audience. You can learn more about our data collection     and use practices in our Privacy Policy.<br><br>    If you wish to request that your personal information is not shared with third     parties, please click on the below checkbox and confirm your selection. Please note     that after your opt out request is processed, we may still collect your     information in order to operate our site.",
      USP_DNS_TOGGLE_TEXT: 'I want to make a "Do Not Sell My Data" request. Note: this action will make it     harder for us to tailor content for you.',
      USP_PRIVACY_POLICY_TEXT: "Privacy Policy",
      USP_DATA_DELETION_TEXT: "Data Deletion",
      USP_DATA_ACCESS_TEXT: "Data Access",
      USP_CONFIRM_BUTTON_TEXT: "CONFIRM"
    },
    fr: {
      INIT_SCREEN_TITLE_TEXT: "Le respect de votre vie privée est notre priorité",
      INIT_SCREEN_BODY_TEXT: {
        1: "Nos partenaires et nous-mêmes exploitons différentes technologies, telles que celle des cookies, et traitons vos données à caractère personnel, telles que les adresses IP et les identifiants de cookie, afin de personnaliser les publicités et les contenus en fonction de vos centres d’intérêt, d’évaluer la performance de ces publicités et contenus, et de recueillir des informations sur les publics qui les ont visionnés. Cliquez ci-dessous si vous consentez à l’utilisation de cette technologie et au traitement de vos données à caractère personnel en vue de ces objectifs. Vous pouvez changer d’avis et modifier votre consentement à tout moment en revenant sur ce site.",
        2: "Nos partenaires et nous-mêmes traitons vos données à caractère personnel, telles que les adresses IP et les identifiants de cookie, et exploitons différentes technologies, telles que celle des cookies, afin de personnaliser les publicités et les contenus en fonction de vos centres d’intérêt, d’évaluer la performance de ces publicités et contenus, et de recueillir des informations sur les publics qui les ont visionnés. Cliquez ci-dessous si vous consentez au traitement de vos données ou si vous désirez choisir les partenaires qui pourront les traiter et à quelles fins. Vous pouvez modifier vos paramètres à tout moment.",
        3: "Les informations et le contenu relatifs à la qualité que nous vous communiquons dépendent des revenus générés par notre publicité. Nos partenaires et nous-mêmes exploitons vos données à caractère personnel, telles que les adresses IP et les identifiants de cookie, afin de personnaliser les publicités et les contenus en fonction de vos centres d’intérêt, d’évaluer la performance de ces publicités et contenus, et de recueillir des informations sur les différents publics qui les ont visionnés. Cliquez ci-dessous si vous consentez à l’utilisation des cookies et au traitement de vos données. Vous pouvez revenir sur votre choix à tout moment.",
        softOptIn: "Nos partenaires et nous-mêmes exploitons différentes technologies, telles que celle des cookies, et traitons vos données à caractère personnel, telles que les adresses IP et les identifiants de cookie, afin de personnaliser les publicités et les contenus en fonction de vos centres d’intérêt, d’évaluer la performance de ces publicités et contenus, et de recueillir des informations sur les publics qui les ont visionnés. Poursuivre la navigation sur ce site ou cliquer sur le bouton d’acceptation signifie que vous consentez à l’utilisation de cette technologie et au traitement de vos données à caractère personnel en vue de ces objectifs. Vous pouvez changer d’avis et modifier votre consentement à tout moment en revenant sur ce site."
      },
      INIT_SCREEN_SETTINGS_BUTTON_TEXT: "PLUS D'OPTIONS",
      INIT_SCREEN_REJECT_BUTTON_TEXT: "JE N’ACCEPTE PAS",
      INIT_SCREEN_ACCEPT_BUTTON_TEXT: "J'accepte",
      INIT_SCREEN_PURPOSE_LINK_TEXT: "Afficher les objectifs",
      INIT_SCREEN_ATTRIBUTION_TEXT: "Powered by",
      PURPOSE_SCREEN_TITLE_TEXT: "Le respect de votre vie privée est notre priorité",
      PURPOSE_SCREEN_BODY_TEXT: "Vous pouvez définir ci-dessous vos préférences de consentement et déterminer la manière dont vous souhaitez que vos données soient utilisées en fonction des objectifs mentionnés. Vous pouvez définir vos préférences pour notre société, indépendamment de celles de nos partenaires tiers. Chaque objectif est décrit afin que vous sachiez comment nos partenaires et nous-mêmes exploitons vos données.",
      PURPOSE_SCREEN_VENDOR_LINK_TEXT: "Consulter les fournisseurs",
      PURPOSE_SCREEN_CANCEL_BUTTON_TEXT: "Annuler",
      PURPOSE_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "Enregistrer et quitter",
      VENDOR_SCREEN_TITLE_TEXT: "Le respect de votre vie privée est notre priorité",
      VENDOR_SCREEN_BODY_TEXT: "Vous pouvez définir ci-dessous vos préférences de consentement pour les partenaires tiers avec lesquels nous collaborons. Développez chaque élément de la liste des sociétés afin de découvrir l’objectif de ce traitement de données et de préciser votre choix. Dans certains cas, les sociétés peuvent exploiter vos données sans demander votre consentement, sur la base de leurs intérêts légitimes. Vous pouvez cliquer sur les liens relatifs à leur politique de confidentialité afin d’obtenir plus d’informations et de vous opposer à un tel traitement si vous le désirez.",
      REJECT_ALL_BUTTON_TEXT: "Tout Refuser",
      ACCEPT_ALL_BUTTON_TEXT: "Tout Accepter",
      VENDOR_SCREEN_PURPOSES_LINK_TEXT: "Revenir aux Objectifs",
      VENDOR_SCREEN_CANCEL_BUTTON_TEXT: "Annuler",
      VENDOR_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "Enregistrer et quitter",
      CONSENT_LINK_LABEL: "Confidentialité",
      BACK_LABEL: "Retour",
      VIEW_COMPANIES_LABEL: "Voir la liste",
      HIDE_COMPANIES_LABEL: "Fermer la liste ",
      THIRD_PARTY_VENDORS_LABEL: "Partenaires",
      ON_LABEL: "Activé",
      OFF_LABEL: "Désactivé",
      OFF_ON_LABEL: "Désactivé/Activé",
      OTHER: "Autre",
      NON_IAB_TITLE: "Fournisseurs non IAB",
      DESCRIPTION: "Description du fournisseur:",
      COMPANY_LABEL: "Société",
      REQUIRED_LABEL: "Requis",
      PRIVACY_POLICY_LABEL: "Politique de confidentialité: ",
      PURPOSES_LABEL: "Objectifs (consentement)",
      FEATURES_LABEL: "Fonctionnalités",
      LEGITIMATE_INTEREST_PURPOSES_LABEL: "Objectifs (intérêts légitimes)",
      SOFT_OPT_IN_ALERT_TITLE_TEXT: "Vos choix relatifs au traitement de vos données personnelles ont été pris en compte.",
      SOFT_OPT_IN_ALERT_BODY_TEXT: "Pour refuser ou modifier vos préférences, veuillez cliquer sur le bouton <strong>Confidentialité</strong>.",
      GOOGLE_PURPOSES_TEXT: "Autoriser Google et ses partenaires technologiques à recueillir des données et à utiliser des cookies à des fins de personnalisation et d’évaluation publicitaires."
    },
    de: {
      INIT_SCREEN_TITLE_TEXT: "Wir respektieren Ihre Privatsphäre",
      INIT_SCREEN_BODY_TEXT: {
        1: "Wir und unsere Partner verwenden Technologien wie Cookies und verarbeiten personenbezogene Daten wie IP-Adressen und Cookie-IDs, um Anzeigen und Inhalte auf Grundlage Ihrer Interessen zu personalisieren, die Leistung von Anzeigen und Inhalten zu messen und Erkenntnisse über die Zielgruppen zu gewinnen, die Anzeigen und Inhalte gesehen haben. Klicken Sie unten, um der Verwendung dieser Technologie und der Verarbeitung Ihrer persönlichen Daten für diese Zwecke zuzustimmen. Sie können Ihre Meinung und Ihre Einwilligungsentscheidungen jederzeit ändern, indem Sie auf diese Website zurückkehren.",
        2: "Wir und unsere Partner verarbeiten Ihre personenbezogenen Daten wie IP-Adressen und Cookie-IDs mithilfe von Technologien wie Cookies, um Anzeigen und Inhalte auf Grundlage Ihrer Interessen zu personalisieren, die Leistung von Anzeigen und Inhalten zu messen und Erkenntnisse über die Zielgruppen zu gewinnen, die Anzeigen und Inhalte gesehen haben. Klicken Sie unten, um zuzustimmen oder auszuwählen, welche Partner Ihre Daten zu welchen Zwecken verarbeiten dürfen. Sie können jederzeit Änderungen an Ihren Einstellungen vornehmen.",
        3: "Die Qualität der Inhalte und Informationen, die wir Ihnen zur Verfügung stellen, hängt von den Einnahmen ab, die wir durch Werbung erzielen. Wir und unsere Partner verwenden Ihre personenbezogenen Daten wie IP-Adressen und Cookie-IDs, um Anzeigen und Inhalte auf Grundlage Ihrer Interessen zu personalisieren, die Leistung von Anzeigen und Inhalten zu messen und Erkenntnisse über die Zielgruppen zu gewinnen, die Anzeigen und Inhalte gesehen haben. Klicken Sie unten, um der Verwendung von Cookies und der Verarbeitung Ihrer Daten zuzustimmen. Sie können jederzeit zu Ihrer Auswahl zurückgehen.",
        softOptIn: "We and our partners use technologies, such as cookies, and process personal data, such as IP addresses and cookie identifiers, to personalise ads and content based on your interests, measure the performance of ads and content, and derive insights about the audiences who saw ads and content. Continue using this website or click below to consent to the use of this technology and the processing of your personal data for these purposes. You can change your mind and change your consent choices at any time by returning to this site."
      },
      INIT_SCREEN_SETTINGS_BUTTON_TEXT: "MEHR OPTIONEN",
      INIT_SCREEN_REJECT_BUTTON_TEXT: "ICH STIMME NICHT ZU",
      INIT_SCREEN_ACCEPT_BUTTON_TEXT: "ICH STIMME ZU",
      INIT_SCREEN_PURPOSE_LINK_TEXT: "Zwecke anzeigen",
      INIT_SCREEN_ATTRIBUTION_TEXT: "Unterstützt von",
      PURPOSE_SCREEN_TITLE_TEXT: "Wir respektieren Ihre Privatsphäre",
      PURPOSE_SCREEN_BODY_TEXT: "Sie können Ihre Einwilligungsvorgaben festlegen und bestimmen, wie Ihre Daten basierend auf den folgenden Zwecken verwendet werden sollen. Sie können Ihre Einstellungen für uns unabhängig von denen von Drittanbietern vornehmen. Jeder Zweck hat eine Beschreibung, damit Sie wissen, wie wir und unsere Partner Ihre Daten verwenden.",
      PURPOSE_SCREEN_VENDOR_LINK_TEXT: "Anbieter anzeigen",
      PURPOSE_SCREEN_CANCEL_BUTTON_TEXT: "Abbrechen",
      PURPOSE_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "Speichern & verlassen",
      VENDOR_SCREEN_TITLE_TEXT: "Wir respektieren Ihre Privatsphäre",
      VENDOR_SCREEN_BODY_TEXT: "Im Folgenden können Sie Einwilligungsvorgaben für einzelne Drittanbieter festlegen, mit denen wir zusammenarbeiten. Zur Erleichterung Ihrer Auswahl können Sie die einzelnen Einträge auf der Unternehmensliste erweitern, um zu sehen, für welche Zwecke sie Daten verwenden. In einigen Fällen können Unternehmen Ihre Daten aufgrund ihrer berechtigten Interessen verwenden, ohne Sie um Ihre Zustimmung zu bitten. Sie können auf deren Datenschutzrichtlinien-Links klicken, um weitere Informationen zu erhalten und einer solchen Verarbeitung zu widersprechen.",
      REJECT_ALL_BUTTON_TEXT: "Alle ablehnen",
      ACCEPT_ALL_BUTTON_TEXT: "Alle akzeptieren",
      VENDOR_SCREEN_PURPOSES_LINK_TEXT: "Zurück zu den Zwecken",
      VENDOR_SCREEN_CANCEL_BUTTON_TEXT: "Abbrechen",
      VENDOR_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "Speichern & verlassen",
      CONSENT_LINK_LABEL: "Datenschutz",
      BACK_LABEL: "Zurück",
      VIEW_COMPANIES_LABEL: "Unternehmen einblenden",
      HIDE_COMPANIES_LABEL: "Unternehmen ausblenden",
      THIRD_PARTY_VENDORS_LABEL: "Drittanbieter",
      ON_LABEL: "An",
      OFF_LABEL: "Aus",
      OFF_ON_LABEL: "Aus/An",
      OTHER: "Sonstiges",
      NON_IAB_TITLE: "Nicht-IAB-Anbieter",
      DESCRIPTION: "Anbieterbeschreibung:",
      COMPANY_LABEL: "Unternehmen",
      REQUIRED_LABEL: "Erforderlich",
      PRIVACY_POLICY_LABEL: "Datenschutzerklärung: ",
      PURPOSES_LABEL: "ZZwecke (Zustimmung)",
      FEATURES_LABEL: "Funktionalitäten",
      LEGITIMATE_INTEREST_PURPOSES_LABEL: "Zwecke (berechtigte Interessen)",
      SOFT_OPT_IN_ALERT_TITLE_TEXT: "Your consent preferences have been saved.",
      SOFT_OPT_IN_ALERT_BODY_TEXT: "To withdraw your consent or change your preferences, please click on the <strong>Privacy</strong>button.",
      GOOGLE_PURPOSES_TEXT: "Google und seinen Technologiepartnern erlauben, Daten zu sammeln und Cookies zur Personalisierung und Messung von Anzeigen zu verwenden."
    },
    it: {
      INIT_SCREEN_TITLE_TEXT: "Il rispetto della tua privacy è la nostra priorità",
      INIT_SCREEN_BODY_TEXT: {
        1: "Noi e i nostri partner utilizziamo tecnologie, quali quelle dei cookie, ed elaboriamo i dati personali, quali gli indirizzi IP e gli identificatori dei cookie, per personalizzare gli annunci e i contenuti in base ai tuoi interessi, misurare le prestazioni di annunci e contenuti e ricavare informazioni sul pubblico che ha visualizzato gli annunci e i contenuti. Fai clic sotto per acconsentire all'utilizzo di questa tecnologia e al trattamento dei tuoi dati personali per queste finalità. Puoi cambiare idea e modificare le tue opzioni sul consenso in qualsiasi momento ritornando su questo sito.",
        2: "Noi e i nostri partner elaboriamo i tuoi dati personali, quali gli indirizzi IP e gli identificatori dei cookie, utilizzando tecnologie quali quelle dei cookie per personalizzare gli annunci e i contenuti in base ai tuoi interessi, misurare le prestazioni di annunci e contenuti e ricavare informazioni sul pubblico che ha visualizzato gli annunci e i contenuti. Fai clic di seguito per acconsentire o scegliere i Partner che elaboreranno i tuoi dati e per quali finalità. Puoi modificare le tue impostazioni in qualsiasi momento.",
        3: "I contenuti e le informazioni di qualità che forniamo dipendono dalle entrate generate dalla pubblicità. Noi e i nostri partner utilizziamo i tuoi dati personali, quali gli indirizzi IP e gli identificatori dei cookie, per personalizzare gli annunci e i contenuti in base ai tuoi interessi, misurare le prestazioni di annunci e contenuti e ricavare informazioni sul pubblico che ha visualizzato gli annunci e i contenuti. Fai clic sotto per acconsentire all'utilizzo dei cookie e al trattamento dei tuoi dati. Puoi rivedere le tue scelte in qualsiasi momento.",
        softOptIn: "We and our partners use technologies, such as cookies, and process personal data, such as IP addresses and cookie identifiers, to personalise ads and content based on your interests, measure the performance of ads and content, and derive insights about the audiences who saw ads and content. Continue using this website or click below to consent to the use of this technology and the processing of your personal data for these purposes. You can change your mind and change your consent choices at any time by returning to this site."
      },
      INIT_SCREEN_SETTINGS_BUTTON_TEXT: "PIÙ OPZIONI",
      INIT_SCREEN_REJECT_BUTTON_TEXT: "Non Accetto",
      INIT_SCREEN_ACCEPT_BUTTON_TEXT: "Accetto",
      INIT_SCREEN_PURPOSE_LINK_TEXT: "Mostra finalità",
      INIT_SCREEN_ATTRIBUTION_TEXT: "Offerto da",
      PURPOSE_SCREEN_TITLE_TEXT: "Il rispetto della tua privacy è la nostra priorità",
      PURPOSE_SCREEN_BODY_TEXT: "Di seguito puoi impostare le preferenze sul consenso e determinare come desideri utilizzare i dati in base alle finalità. Puoi impostare le tue preferenze per noi indipendentemente da quelle dei partner di terze parti. Ogni finalità ha una descrizione in modo che tu sappia come noi e i nostri partner utilizziamo i tuoi dati.",
      PURPOSE_SCREEN_VENDOR_LINK_TEXT: "Visualizza i fornitori",
      PURPOSE_SCREEN_CANCEL_BUTTON_TEXT: "Annullare",
      PURPOSE_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "Salva ed Esci",
      VENDOR_SCREEN_TITLE_TEXT: "Il rispetto della tua privacy è la nostra priorità",
      VENDOR_SCREEN_BODY_TEXT: "Di seguito puoi impostare le preferenze sul consenso per i singoli partner di terze parti con cui collaboriamo. Per visualizzare le finalità rispetto alle quali i singoli partner di terze parti usano i dati per agevolarti nelle tue scelte, espandi ogni voce dell'elenco di aziende. In alcuni casi, le aziende potrebbero utilizzare i tuoi dati senza chiedere il tuo consenso, in base ai loro legittimi interessi. Per ulteriori informazioni e per opporti a tale elaborazione, puoi fare clic sui rispettivi link alla policy sulla privacy.",
      REJECT_ALL_BUTTON_TEXT: "RIFIUTA TUTTO",
      ACCEPT_ALL_BUTTON_TEXT: "ACCETTA TUTTO",
      VENDOR_SCREEN_PURPOSES_LINK_TEXT: "Torna alle finalità",
      VENDOR_SCREEN_CANCEL_BUTTON_TEXT: "Annullare",
      VENDOR_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "Salva ed Esci",
      CONSENT_LINK_LABEL: "Privacy",
      BACK_LABEL: "Indietro",
      VIEW_COMPANIES_LABEL: "Vedi la lista",
      HIDE_COMPANIES_LABEL: "Nascondi la lista",
      THIRD_PARTY_VENDORS_LABEL: "Partner di terze parti",
      ON_LABEL: "Attivo",
      OFF_LABEL: "Disattivo",
      OFF_ON_LABEL: "Disattivo/Attivo",
      OTHER: "Altro",
      NON_IAB_TITLE: "Non-IAB Fornitori non IAB",
      DESCRIPTION: "Descrizione del fornitore:",
      COMPANY_LABEL: "Azienda",
      REQUIRED_LABEL: "Obbligatorio",
      PRIVACY_POLICY_LABEL: "Informativa sulla privacy: ",
      PURPOSES_LABEL: "Finalità (consenso)",
      FEATURES_LABEL: "Funzionalità",
      LEGITIMATE_INTEREST_PURPOSES_LABEL: "Finalità (interessi legittimi)",
      SOFT_OPT_IN_ALERT_TITLE_TEXT: "Your consent preferences have been saved.",
      SOFT_OPT_IN_ALERT_BODY_TEXT: "To withdraw your consent or change your preferences, please click on the <strong>Privacy</strong>button.",
      GOOGLE_PURPOSES_TEXT: "Consenti a Google e ai suoi partner tecnologici di raccogliere i dati e utilizzare i cookie per la personalizzazione e la misurazione degli annunci."
    },
    es: {
      INIT_SCREEN_TITLE_TEXT: "Tu privacidad es importante para nosotros",
      INIT_SCREEN_BODY_TEXT: {
        1: "Nosotros y nuestros socios utilizamos tecnologías, como las cookies, y procesamos datos personales, como las direcciones IP y los identificadores de cookies, para personalizar los anuncios y el contenido según sus intereses, medir el rendimiento de los anuncios y el contenido y obtener información sobre las audiencias que vieron los anuncios y el contenido. Haga clic a continuación para autorizar el uso de esta tecnología y el procesamiento de sus datos personales para estos fines. Puede cambiar de opinión y cambiar sus opciones de consentimiento en cualquier momento al regresar a este sitio.",
        2: "Nosotros y nuestros socios procesamos sus datos personales, como las direcciones IP y los identificadores de cookies, con tecnología como las cookies para personalizar los anuncios y el contenido según sus intereses, medir el rendimiento de los anuncios y el contenido y obtener información sobre las audiencias que vieron los anuncios y el contenido. Haga clic a continuación para dar su consentimiento o para elegir qué Socios procesan sus datos y para qué fines. Puede realizar cambios en su configuración en cualquier momento.",
        3: "La calidad del contenido y la información que le proporcionamos depende de los ingresos que generamos de la publicidad. Nosotros y nuestros socios utilizamos sus datos personales, como las direcciones IP y los identificadores de cookies, para personalizar los anuncios y el contenido según sus intereses, medir el rendimiento de los anuncios y el contenido y obtener información sobre las audiencias que vieron los anuncios y el contenido. Haga clic a continuación para autorizar el uso de cookies y el procesamiento de sus datos. Puede volver a visitar sus opciones en cualquier momento.",
        softOptIn: "We and our partners use technologies, such as cookies, and process personal data, such as IP addresses and cookie identifiers, to personalise ads and content based on your interests, measure the performance of ads and content, and derive insights about the audiences who saw ads and content. Continue using this website or click below to consent to the use of this technology and the processing of your personal data for these purposes. You can change your mind and change your consent choices at any time by returning to this site."
      },
      INIT_SCREEN_SETTINGS_BUTTON_TEXT: "MÁS OPCIONES",
      INIT_SCREEN_REJECT_BUTTON_TEXT: "No acepto",
      INIT_SCREEN_ACCEPT_BUTTON_TEXT: "Acepto",
      INIT_SCREEN_PURPOSE_LINK_TEXT: "Mostrar objetivos",
      INIT_SCREEN_ATTRIBUTION_TEXT: "Accionado por",
      PURPOSE_SCREEN_TITLE_TEXT: "Tu privacidad es importante para nosotros",
      PURPOSE_SCREEN_BODY_TEXT: "Puede establecer sus preferencias de consentimiento y determinar cómo desea que se utilicen sus datos según los fines que se detallan a continuación. Puede establecer sus preferencias con respecto a nosotros independientemente de las de los socios externos. Cada objetivo tiene una descripción para que sepa cómo nosotros y los socios usamos sus datos.",
      PURPOSE_SCREEN_VENDOR_LINK_TEXT: "Ver vendedores",
      PURPOSE_SCREEN_CANCEL_BUTTON_TEXT: "Cancelar",
      PURPOSE_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "Guardar y salir",
      VENDOR_SCREEN_TITLE_TEXT: "Tu privacidad es importante para nosotros",
      VENDOR_SCREEN_BODY_TEXT: "Puede configurar las preferencias de consentimiento para los terceros externos individuales con los que trabajamos a continuación. Expanda cada elemento de la lista de la compañía para ver para qué fines usan los datos para ayudarlo a tomar sus decisiones. En algunos casos, las compañías pueden usar sus datos sin pedir su consentimiento en función de sus intereses legítimos. Puede hacer clic en los enlaces de sus políticas de privacidad para obtener más información y para objetar dicho procesamiento.",
      REJECT_ALL_BUTTON_TEXT: "Rechazar todo",
      ACCEPT_ALL_BUTTON_TEXT: "Aceptar todo",
      VENDOR_SCREEN_PURPOSES_LINK_TEXT: "Volver a propósitos",
      VENDOR_SCREEN_CANCEL_BUTTON_TEXT: "Cancelar",
      VENDOR_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "Guardar y salir",
      CONSENT_LINK_LABEL: "Privacidad",
      BACK_LABEL: "Volver",
      VIEW_COMPANIES_LABEL: "Ver empresas",
      HIDE_COMPANIES_LABEL: "Ocultar empresas",
      THIRD_PARTY_VENDORS_LABEL: "Partners",
      ON_LABEL: "Activar",
      OFF_LABEL: "Desactivar",
      OFF_ON_LABEL: "Desactivar/Activar",
      OTHER: "Otro",
      NON_IAB_TITLE: "Proveedores que no pertenecen a IAB",
      DESCRIPTION: "Descripción del vendedor:",
      COMPANY_LABEL: "Empresa",
      REQUIRED_LABEL: "Obligatorio",
      PRIVACY_POLICY_LABEL: "Política de privacidad: ",
      PURPOSES_LABEL: "Objetivos (consentimiento)",
      FEATURES_LABEL: "Características",
      LEGITIMATE_INTEREST_PURPOSES_LABEL: "Objetivos (intereses legítimos)",
      SOFT_OPT_IN_ALERT_TITLE_TEXT: "Your consent preferences have been saved.",
      SOFT_OPT_IN_ALERT_BODY_TEXT: "To withdraw your consent or change your preferences, please click on the <strong>Privacy</strong>button.",
      GOOGLE_PURPOSES_TEXT: "Permitir que Google y sus socios tecnológicos recopilen datos y utilicen cookies para la personalización de anuncios y medición."
    },
    da: {
      INIT_SCREEN_TITLE_TEXT: "Vi respekterer privatlivets fred",
      INIT_SCREEN_BODY_TEXT: {
        1: "Vi og vores partnere bruger teknologier, såsom cookies, og behandler personlige data, såsom IP-adresser og cookie-identifikatorer, til at skræddersy reklamer og indhold på basis af dine interesser, for at måle reklamernes og indholdenes virkningsgrad og for at lære noget om dem, der har set reklamerne og indholdene. Klik nedenunder for at give samtykke til brugen af denne teknologi og behandling af dine personlige data til disse formål. Du kan til enhver tid skifte holdning og ændre dine valg ved at vende tilbage til denne site.",
        2: "Vi og vores partnere behandler dine personlige data, såsom IP-adresser og cookie-identifikatorer, ved hjælp af teknologier, såsom cookies, til at skræddersy reklamer og indhold på basis af dine interesser, for at måle reklamernes og indholdenes virkningsgrad og for at lære noget om dem, der har set reklamerne og indholdene. Klik nedenunder for at give samtykke eller for at vælge hvilke partnere, der skal behandle dine data, og til hvilke formål. Du kan til enhver tid ændre dine indstillinger.",
        3: "Kvalitetsindholdet og oplysningerne, som vi tilbyder dig, er afhængige af de indtægter, vi generer igennem reklamer. Vi og vores partnere bruger dine personlige data, såsom IP-adresser og cookie-identifikatorer, til at skræddersy reklamer og indhold på basis af dine interesser, til at måle reklamernes og indholdenes virkningsgrad og til at lære noget om dem, der har set reklamerne og indholdene. Klik nedenunder for at give samtykke til brugen af cookies og behandling af dine data. Du kan til enhver tid ændre dine valg.",
        softOptIn: "We and our partners use technologies, such as cookies, and process personal data, such as IP addresses and cookie identifiers, to personalise ads and content based on your interests, measure the performance of ads and content, and derive insights about the audiences who saw ads and content. Continue using this website or click below to consent to the use of this technology and the processing of your personal data for these purposes. You can change your mind and change your consent choices at any time by returning to this site."
      },
      INIT_SCREEN_SETTINGS_BUTTON_TEXT: "FLERE MULIGHEDER",
      INIT_SCREEN_REJECT_BUTTON_TEXT: "JEG SAMTYKKER IKKE",
      INIT_SCREEN_ACCEPT_BUTTON_TEXT: "JEG SAMTYKKER",
      INIT_SCREEN_PURPOSE_LINK_TEXT: "Vis formål",
      PURPOSE_SCREEN_TITLE_TEXT: "Vi respekterer privatlivets fred",
      PURPOSE_SCREEN_BODY_TEXT: "Du kan vælge dine samtykkepræferencer og bestemme, hvordan dine data skal behandles på basis af formålene nedenunder. Du kan vælge dine præferencer i forhold til os uafhængigt af dine præferencer for tredjemandspartnere. Til hvert formål foreligger der en beskrivelse, så du ved, hvordan vi og vores partnere bruger dine data.",
      PURPOSE_SCREEN_VENDOR_LINK_TEXT: "Se Forhandlere",
      PURPOSE_SCREEN_CANCEL_BUTTON_TEXT: "Annuller",
      PURPOSE_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "Gem og luk",
      VENDOR_SCREEN_TITLE_TEXT: "Vi respekterer privatlivets fred",
      VENDOR_SCREEN_BODY_TEXT: "Du kan vælge dine præferencer for samtykke vedrørende enkelte tredjemandspartnere nedenfor. Udvid hver firmaliste for at se, hvilke formål de bruger data til, så du nemmere kan træffe dine valg. I nogle tilfælde kan virksomheder bruge dine data uden at bede om dit samtykke baseret på deres egne legitime interesser. Klik på linkene til deres politikker om privatlivets fred for yderligere oplysninger og for eventuelt at protestere imod den slags databehandling.",
      REJECT_ALL_BUTTON_TEXT: "AFVIS ALLE",
      ACCEPT_ALL_BUTTON_TEXT: "ACCEPTER ALLE",
      VENDOR_SCREEN_PURPOSES_LINK_TEXT: "Tilbage til formål",
      VENDOR_SCREEN_CANCEL_BUTTON_TEXT: "Annuller",
      VENDOR_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "Gem og luk",
      CONSENT_LINK_LABEL: "Privatlivets fred",
      BACK_LABEL: "Tilbage",
      VIEW_COMPANIES_LABEL: "Vis virksomheder",
      HIDE_COMPANIES_LABEL: "Skjul virksomheder",
      THIRD_PARTY_VENDORS_LABEL: "Tredjepartsleverandører",
      ON_LABEL: "Til",
      OFF_LABEL: "Fra",
      OFF_ON_LABEL: "Fra/Til",
      OTHER: "Andet",
      NON_IAB_TITLE: "Ikke-IAB-forhandlere",
      DESCRIPTION: "Forhandlerbeskrivelse:",
      COMPANY_LABEL: "Virksomhed",
      REQUIRED_LABEL: "Obligatorisk",
      PRIVACY_POLICY_LABEL: "Politik for beskyttelse af personoplysninger: ",
      PURPOSES_LABEL: "Formål (samtykke)",
      FEATURES_LABEL: "Formål - Legitime interesser:",
      LEGITIMATE_INTEREST_PURPOSES_LABEL: "Formål (legitime interesser)",
      SOFT_OPT_IN_ALERT_TITLE_TEXT: "Your consent preferences have been saved.",
      SOFT_OPT_IN_ALERT_BODY_TEXT: "To withdraw your consent or change your preferences, please click on the <strong>Privacy</strong>button.",
      GOOGLE_PURPOSES_TEXT: "Giv samtykke til, at Google og deres teknologiske partnere indsamler data og bruger cookies til at personliggøre reklame og måling."
    },
    nl: {
      INIT_SCREEN_TITLE_TEXT: "We respecteren uw privacy",
      INIT_SCREEN_BODY_TEXT: {
        1: "Wij en onze partners gebruiken technologieën, zoals cookies, en verwerken persoonlijke gegevens, zoals IP-adressen en cookie-identificatoren, om advertenties en inhoud te personaliseren op basis van uw interesses, de resultaten van advertenties en inhoud te meten en inzichten te verkrijgen over het publiek dat deze advertenties en inhoud heeft bekeken. Klik hieronder om toestemming te geven voor het gebruik van deze technologie en de verwerking van uw persoonlijke gegevens voor deze doeleinden. U kunt op elk moment van gedachten veranderen en uw toestemmingskeuzes wijzigen door terug te keren naar deze site.",
        2: "Wij en onze partners verwerken uw persoonlijke gegevens, zoals IP-adressen en cookie-identificatoren, met behulp van technologie zoals cookies om advertenties en inhoud te personaliseren op basis van uw interesses, de resultaten van advertenties en inhoud te meten en inzichten te verkrijgen over het publiek dat deze advertenties en inhoud heeft bekeken. Klik hieronder om toestemming te geven of om te kiezen welke partners uw gegevens verwerken en voor welke doeleinden. U kunt uw instellingen op elk gewenst moment wijzigen.",
        3: "De kwaliteit van de inhoud en informatie die we u verstrekken, is afhankelijk van de inkomsten die we genereren uit advertenties. Wij en onze partners gebruiken uw persoonlijke gegevens, zoals IP-adressen en cookie-identificatoren om advertenties en inhoud te personaliseren op basis van uw interesses, de resultaten van advertenties en inhoud te meten en inzichten te verkrijgen over het publiek dat advertenties en inhoud heeft bekeken. Klik hieronder om toestemming te geven voor het gebruik van cookies en de verwerking van uw gegevens. U kunt op elk gewenst moment terugkomen op uw keuzes.",
        softOptIn: "We and our partners use technologies, such as cookies, and process personal data, such as IP addresses and cookie identifiers, to personalise ads and content based on your interests, measure the performance of ads and content, and derive insights about the audiences who saw ads and content. Continue using this website or click below to consent to the use of this technology and the processing of your personal data for these purposes. You can change your mind and change your consent choices at any time by returning to this site."
      },
      INIT_SCREEN_SETTINGS_BUTTON_TEXT: "MEER OPTIES",
      INIT_SCREEN_REJECT_BUTTON_TEXT: "IK GA NIET AKKOORD",
      INIT_SCREEN_ACCEPT_BUTTON_TEXT: "IK GA AKKOORD",
      INIT_SCREEN_PURPOSE_LINK_TEXT: "Doeleinden weergeven",
      PURPOSE_SCREEN_TITLE_TEXT: "Wij respecteren uw privacy",
      PURPOSE_SCREEN_BODY_TEXT: "U kunt uw toestemmingsvoorkeuren instellen en bepalen hoe u uw gegevens wilt gebruiken op basis van de onderstaande doeleinden. U kunt uw voorkeuren voor ons onafhankelijk van die van externe partners instellen. Elk doeleinde heeft een beschrijving zodat u weet hoe wij en onze partners uw gegevens gebruiken.",
      PURPOSE_SCREEN_VENDOR_LINK_TEXT: "Zie leveranciers",
      PURPOSE_SCREEN_CANCEL_BUTTON_TEXT: "Annuleer",
      PURPOSE_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "Opslaan en afsluiten",
      VENDOR_SCREEN_TITLE_TEXT: "Wij respecteren uw privacy",
      VENDOR_SCREEN_BODY_TEXT: "U kunt hieronder toestemmingsvoorkeuren instellen voor individuele externe partners waarmee wij werken. Vouw elk item uit de bedrijfslijst uit om te zien voor welke doeleinden ze gegevens gebruiken om u te helpen bij het maken van uw keuzes. In sommige gevallen kunnen bedrijven uw gegevens gebruiken zonder uw toestemming te vragen, op basis van hun legitieme belangen. U kunt op hun privacybeleidlinks klikken voor meer informatie en bezwaar maken tegen dergelijke verwerking.",
      REJECT_ALL_BUTTON_TEXT: "ALLES AFWIJZEN",
      ACCEPT_ALL_BUTTON_TEXT: "ALLES ACCEPTEREN",
      VENDOR_SCREEN_PURPOSES_LINK_TEXT: "Terug naar Doeleinden",
      VENDOR_SCREEN_CANCEL_BUTTON_TEXT: "Annuleer",
      VENDOR_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "Opslaan en afsluiten",
      CONSENT_LINK_LABEL: "Privacy",
      BACK_LABEL: "Terug",
      VIEW_COMPANIES_LABEL: "Lijst weergeven",
      HIDE_COMPANIES_LABEL: "Lijst verbergen",
      THIRD_PARTY_VENDORS_LABEL: "Partners",
      ON_LABEL: "Aan",
      OFF_LABEL: "Uit",
      OFF_ON_LABEL: "Uit/Aan",
      OTHER: "Overige",
      NON_IAB_TITLE: "Niet-IAB-leveranciers",
      DESCRIPTION: "Beschrijving leverancier:",
      COMPANY_LABEL: "Bedrijf",
      REQUIRED_LABEL: "Verplicht",
      PRIVACY_POLICY_LABEL: "Privacybeleid: ",
      PURPOSES_LABEL: "Doeleinden (toestemming)",
      FEATURES_LABEL: "Functies",
      LEGITIMATE_INTEREST_PURPOSES_LABEL: "Doeleinden (legitieme belangen)",
      SOFT_OPT_IN_ALERT_TITLE_TEXT: "Your consent preferences have been saved.",
      SOFT_OPT_IN_ALERT_BODY_TEXT: "To withdraw your consent or change your preferences, please click on the <strong>Privacy</strong>button.",
      GOOGLE_PURPOSES_TEXT: "Google en zijn technologiepartners toestaan om gegevens te verzamelen en cookies te gebruiken voor gepersonaliseerde advertenties en metingen."
    },
    el: {
      INIT_SCREEN_TITLE_TEXT: "Σεβόμαστε την ιδιωτικότητά σας",
      INIT_SCREEN_BODY_TEXT: {
        1: "Εμείς και οι συνεργάτες μας χρησιμοποιούμε τεχνολογίες, όπως cookies, και επεξεργαζόμαστε προσωπικά δεδομένα, όπως διευθύνσεις IP και αναγνωριστικά cookies, για να προσαρμόζουμε τις διαφημίσεις και το περιεχόμενο με βάση τα ενδιαφέροντά σας, για να μετρήσουμε την απόδοση των διαφημίσεων και του περιεχομένου και για να αποκτήσουμε εις βάθος γνώση του κοινού που είδε τις διαφημίσεις και το περιεχόμενο. Κάντε κλικ παρακάτω για να συμφωνήσετε με τη χρήση αυτής της τεχνολογίας και την επεξεργασία των προσωπικών σας δεδομένων για αυτούς τους σκοπούς. Μπορείτε να αλλάξετε γνώμη και να αλλάξετε τις επιλογές της συγκατάθεσής σας ανά πάσα στιγμή επιστρέφοντας σε αυτόν τον ιστότοπο.",
        2: "Εμείς και οι συνεργάτες μας χρησιμοποιούμε τα προσωπικά σας δεδομένα, όπως διευθύνσεις IP και αναγνωριστικά cookies, χρησιμοποιώντας τεχνολογία όπως cookies για να προσαρμόζουμε τις διαφημίσεις και το περιεχόμενο με βάση τα ενδιαφέροντά σας, για να μετρήσουμε την απόδοση των διαφημίσεων και του περιεχομένου και για να αποκτήσουμε εις βάθος γνώση του κοινού που είδε τις διαφημίσεις και το περιεχόμενο. Κάντε κλικ παρακάτω για να δώσετε τη συγκατάθεσή σας ή για να επιλέξετε ποιοι συνεργάτες θα επεξεργαστούν τα δεδομένα σας και για ποιους σκοπούς. Μπορείτε να αλλάξετε τις ρυθμίσεις σας ανά πάσα στιγμή.",
        3: "Η ποιότητα του περιεχομένου και οι πληροφορίες που σας παρέχουμε εξαρτώνται από τα έσοδα από τη διαφήμιση. Εμείς και οι συνεργάτες μας χρησιμοποιούμε τα προσωπικά σας δεδομένα, όπως διευθύνσεις IP και αναγνωριστικά cookies, για να προσαρμόζουμε τις διαφημίσεις και το περιεχόμενο με βάση τα ενδιαφέροντά σας, για να μετρήσουμε την απόδοση των διαφημίσεων και του περιεχομένου και για να αποκτήσουμε εις βάθος γνώση του κοινού που είδε τις διαφημίσεις και το περιεχόμενο. Κάντε κλικ παρακάτω για να δώσετε τη συγκατάθεσή σας για τη χρήση των cookies και την επεξεργασία των δεδομένων σας. Μπορείτε να επανεξετάσετε τις επιλογές σας ανά πάσα στιγμή.",
        softOptIn: "We and our partners use technologies, such as cookies, and process personal data, such as IP addresses and cookie identifiers, to personalise ads and content based on your interests, measure the performance of ads and content, and derive insights about the audiences who saw ads and content. Continue using this website or click below to consent to the use of this technology and the processing of your personal data for these purposes. You can change your mind and change your consent choices at any time by returning to this site."
      },
      INIT_SCREEN_SETTINGS_BUTTON_TEXT: "ΠΕΡΙΣΣΟΤΕΡΕΣ ΕΠΙΛΟΓΕΣ",
      INIT_SCREEN_REJECT_BUTTON_TEXT: "ΔΕ ΣΥΜΦΩΝΩ",
      INIT_SCREEN_ACCEPT_BUTTON_TEXT: "ΣΥΜΦΩΝΩ",
      INIT_SCREEN_PURPOSE_LINK_TEXT: "Εμφάνιση σκοπών",
      PURPOSE_SCREEN_TITLE_TEXT: "Σεβόμαστε την ιδιωτικότητά σας",
      PURPOSE_SCREEN_BODY_TEXT: "Μπορείτε να ορίσετε τις προτιμήσεις συγκατάθεσης σας και να καθορίσετε τον τρόπο με τον οποίο θέλετε να χρησιμοποιηθούν τα δεδομένα σας, με βάση τους παρακάτω σκοπούς. Μπορείτε να ορίσετε τις προτιμήσεις σας για εμάς, ανεξάρτητα από αυτούς τους τρίτους συνεργάτες. Κάθε σκοπός έχει μια περιγραφή, έτσι ώστε να ξέρετε πώς χρησιμοποιούμε τα δεδομένα σας εμείς και οι συνεργάτες μας.",
      PURPOSE_SCREEN_VENDOR_LINK_TEXT: "Εμφάνιση παρόχων",
      PURPOSE_SCREEN_CANCEL_BUTTON_TEXT: "Άκυρο",
      PURPOSE_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "Αποθήκευση και έξοδος",
      VENDOR_SCREEN_TITLE_TEXT: "Σεβόμαστε την ιδιωτικότητά σας",
      VENDOR_SCREEN_BODY_TEXT: "Μπορείτε να ορίσετε τις προτιμήσεις συγκατάθεσης για τους επιμέρους τρίτους συνεργάτες με τους οποίους συνεργαζόμαστε, παρακάτω. Επεκτείνετε το στοιχείο λίστας κάθε εταιρείας, για να δείτε τους σκοπούς για τους οποίους χρησιμοποιούν τα δεδομένα σας, ώστε να κάνετε την επιλογή σας. Σε ορισμένες περιπτώσεις, οι εταιρείες μπορεί να χρησιμοποιήσουν τα δεδομένα σας χωρίς να ζητήσουν τη συγκατάθεσή σας, με βάση τα νόμιμα συμφέροντά τους. Μπορείτε να κάνετε κλικ στους συνδέσμους της πολιτικής απορρήτου τους για περισσότερες πληροφορίες και για να εναντιωθείτε σε αυτή την επεξεργασία.",
      REJECT_ALL_BUTTON_TEXT: "ΑΠΟΡΡΙΨΗ ΟΛΩΝ",
      ACCEPT_ALL_BUTTON_TEXT: "ΑΠΟΔΟΧΗ ΟΛΩΝ",
      VENDOR_SCREEN_PURPOSES_LINK_TEXT: "Πίσω στους Σκοπούς",
      VENDOR_SCREEN_CANCEL_BUTTON_TEXT: "Άκυρο",
      VENDOR_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "Αποθήκευση και έξοδος",
      CONSENT_LINK_LABEL: "Απόρρητο",
      BACK_LABEL: "Επιστροφή",
      VIEW_COMPANIES_LABEL: "Προβολή εταιρειών",
      HIDE_COMPANIES_LABEL: "Απόκρυψη εταιρειών",
      THIRD_PARTY_VENDORS_LABEL: "Τρίτοι προμηθευτές",
      ON_LABEL: "Ναι",
      OFF_LABEL: "Όχι",
      OFF_ON_LABEL: "Όχι/Ναι",
      OTHER: "Άλλο",
      NON_IAB_TITLE: "Πάροχοι μη-IAB",
      DESCRIPTION: "Περιγραφή παρόχου:",
      COMPANY_LABEL: "Εταιρεία",
      REQUIRED_LABEL: "Απαιτείται",
      PRIVACY_POLICY_LABEL: "Πολιτική απορρήτου: ",
      PURPOSES_LABEL: "Σκοποί (Συγκατάθεση)",
      FEATURES_LABEL: "Λειτουργίες:",
      LEGITIMATE_INTEREST_PURPOSES_LABEL: "Σκοποί (Νόμιμα συμφέροντα)",
      SOFT_OPT_IN_ALERT_TITLE_TEXT: "Your consent preferences have been saved.",
      SOFT_OPT_IN_ALERT_BODY_TEXT: "To withdraw your consent or change your preferences, please click on the <strong>Privacy</strong>button.",
      GOOGLE_PURPOSES_TEXT: "Επιτρέψτε στο Google και στους τεχνολογικούς συνεργάτες του να συλλέγουν δεδομένα και να χρησιμοποιούν cookies για εξατομίκευση και μέτρηση διαφημίσεων."
    },
    hu: {
      INIT_SCREEN_TITLE_TEXT: "Fontos számunkra adatainak védelme",
      INIT_SCREEN_BODY_TEXT: {
        1: "A partnereinkkel együtt olyan technológiákat, például cookie-kat használunk, amelyekkel a személyes adatait – például az IP-címeit és a cookie-azonosítóit – feldolgozzuk annak érdekében, hogy az Ön érdeklődési köre alapján személyre szabjuk a hirdetéseket és a tartalmakat, mérjük a hirdetések és a tartalmak teljesítményét, valamint következtetéseket vonjunk le a hirdetések és a tartalom közönségével kapcsolatban. A gombra kattintva hozzájárulhat ennek a technológiának a használatához és az adatai e célokkal történő feldolgozásához. Az oldal későbbi meglátogatásaikor bármikor meggondolhatja magát, és megváltoztathatja a döntését.",
        2: "A személyes adatait – például az IP-címeit és a cookie-azonosítóit – a partnereinkkel együtt a cookie-khoz hasonló technológiák segítségével feldolgozzuk annak érdekében, hogy az Ön érdeklődési köre alapján személyre szabjuk a hirdetéseket és a tartalmakat, mérjük a hirdetések és a tartalmak teljesítményét, valamint következtetéseket vonjunk le a hirdetések és a tartalom közönségével kapcsolatban. A gombra kattintva hozzájárulást adhat, vagy kiválaszthatja, mely partnerek, milyen céllal dolgozhatják fel az adatait. A beállításokat bármikor módosíthatja.",
        3: "A hirdetésekből származó bevétel teszi lehetővé, hogy minőségi tartalmat és tájékoztatást biztosítsunk Önnek. A személyes adatait – például az IP-címeit és a cookie-azonosítóit – partnereinkkel együtt feldolgozzuk annak érdekében, hogy az Ön érdeklődési köre alapján személyre szabjuk a hirdetéseket és a tartalmakat, mérjük a hirdetések és a tartalmak teljesítményét, valamint következtetéseket vonjunk le a hirdetések és a tartalom közönségével kapcsolatban. A gombra kattintva hozzájárulhat a cookie-k használatához és az adatok feldolgozásához. A döntését bármikor megváltoztathatja.",
        softOptIn: "We and our partners use technologies, such as cookies, and process personal data, such as IP addresses and cookie identifiers, to personalise ads and content based on your interests, measure the performance of ads and content, and derive insights about the audiences who saw ads and content. Continue using this website or click below to consent to the use of this technology and the processing of your personal data for these purposes. You can change your mind and change your consent choices at any time by returning to this site."
      },
      INIT_SCREEN_SETTINGS_BUTTON_TEXT: "TÖBB LEHETŐSÉG",
      INIT_SCREEN_REJECT_BUTTON_TEXT: "NEM FOGADOM EL",
      INIT_SCREEN_ACCEPT_BUTTON_TEXT: "ELFOGADOM",
      INIT_SCREEN_PURPOSE_LINK_TEXT: "A célok megjelenítése",
      PURPOSE_SCREEN_TITLE_TEXT: "Fontos számunkra adatainak védelme",
      PURPOSE_SCREEN_BODY_TEXT: "Beállíthatja a hozzájárulási preferenciáit, és meghatározhatja, hogyan kerüljenek felhasználásra az adatai a jövőben az alábbi célok vonatkozásában. A ránk vonatkozó preferenciáit a harmadik felektől függetlenül adhatja meg. A célok melletti leírásból megtudhatja, hogy a partnereinkkel együtt hogyan használjuk fel az adatait.",
      PURPOSE_SCREEN_VENDOR_LINK_TEXT: "Beszállítók megtekintése",
      PURPOSE_SCREEN_CANCEL_BUTTON_TEXT: "Kilépés",
      PURPOSE_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "Mentés és bezárás",
      VENDOR_SCREEN_TITLE_TEXT: "Fontos számunkra adatainak védelme",
      VENDOR_SCREEN_BODY_TEXT: "Az alábbiakban megadhatja az egyes független harmadik felekre vonatkozó hozzájárulással kapcsolatos preferenciáit. A döntése megkönnyítése érdekében kattintson a listában a vállalatok nevére, és megtudhatja, azok milyen célokra használják fel az adatokat. A vállalatok bizonyos esetekben az Ön hozzájárulása nélkül is használhatják az adatait, amennyiben ez jogos érdekük. A vállalatok adatvédelmi szabályzatának linkjére kattintva további információkat tekinthet meg, és elutasíthatja az adott célú feldolgozást.",
      REJECT_ALL_BUTTON_TEXT: "ÖSSZES ELUTASÍTÁSA",
      ACCEPT_ALL_BUTTON_TEXT: "ÖSSZES ELFOGADÁSA",
      VENDOR_SCREEN_PURPOSES_LINK_TEXT: "Vissza a Célok oldalra",
      VENDOR_SCREEN_CANCEL_BUTTON_TEXT: "Kilépés",
      VENDOR_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "Mentés és bezárás",
      CONSENT_LINK_LABEL: "Adatvédelem",
      BACK_LABEL: "Vissza",
      VIEW_COMPANIES_LABEL: "Vállalatok megjelenítése",
      HIDE_COMPANIES_LABEL: "Vállalatok elrejtése",
      THIRD_PARTY_VENDORS_LABEL: "Harmadik fél beszállítók",
      ON_LABEL: "Be",
      OFF_LABEL: "Ki",
      OFF_ON_LABEL: "Ki/Be",
      OTHER: "Egyéb",
      NON_IAB_TITLE: "Nem IAB-hez tartozó beszállítók",
      DESCRIPTION: "Beszállító leírása:",
      COMPANY_LABEL: "Vállalat",
      REQUIRED_LABEL: "Kötelező",
      PRIVACY_POLICY_LABEL: "Adatvédelmi szabályzat: ",
      PURPOSES_LABEL: "Célok (hozzájárulás)",
      FEATURES_LABEL: "Jellemzők:",
      LEGITIMATE_INTEREST_PURPOSES_LABEL: "Célok (jogszerű érdekek)",
      SOFT_OPT_IN_ALERT_TITLE_TEXT: "Your consent preferences have been saved.",
      SOFT_OPT_IN_ALERT_BODY_TEXT: "To withdraw your consent or change your preferences, please click on the <strong>Privacy</strong>button.",
      GOOGLE_PURPOSES_TEXT: "Engedélyezze, hogy a Google és technológiai partnerei adatokat gyűjtsenek és cookie-kat használjanak a hirdetések személyre szabásához és a mérésekhez."
    },
    pt: {
      INIT_SCREEN_TITLE_TEXT: "Damos valor à sua privacidade",
      INIT_SCREEN_BODY_TEXT: {
        1: "Nós e os nossos parceiros utilizamos tecnologias, como cookies, e processamos dados pessoais, como endereços IP e identificadores de cookies, para personalizar anúncios e conteúdos baseados nos seus interesses, avaliar o desempenho desses anúncios e conteúdos, bem como para obter informações sobre o público que os visualizou. Clique abaixo para consentir a utilização desta tecnologia e o processamento dos seus dados pessoais para estas finalidades. Pode mudar de ideias e alterar as suas opções de consentimento a qualquer momento voltando a este site.",
        2: "Nós e os nossos parceiros processamos os seus dados pessoais, como endereços IP e identificadores de cookies, utilizando tecnologias, como cookies, para personalizar anúncios e conteúdos baseados nos seus interesses, avaliar o desempenho desses anúncios e conteúdos, bem como para obter informações sobre o público que os visualizou. Clique abaixo para consentir ou escolher os Parceiros que irão processar os seus dados e para quais Finalidades. Poderá realizar alterações às suas definições a qualquer momento.",
        3: "O conteúdo de qualidade e as informações que lhe fornecemos dependem da receita gerada pela publicidade. Nós e os nossos parceiros utilizamos os seus dados pessoais, como endereços IP e identificadores de cookies, para personalizar anúncios e conteúdos baseados nos seus interesses, avaliar o desempenho desses anúncios e conteúdos, bem como para obter informações sobre o público que os visualizou. Clique abaixo para consentir a utilização de cookies e o processamento dos seus dados. Poderá rever as suas escolhas a qualquer momento.",
        softOptIn: "We and our partners use technologies, such as cookies, and process personal data, such as IP addresses and cookie identifiers, to personalise ads and content based on your interests, measure the performance of ads and content, and derive insights about the audiences who saw ads and content. Continue using this website or click below to consent to the use of this technology and the processing of your personal data for these purposes. You can change your mind and change your consent choices at any time by returning to this site."
      },
      INIT_SCREEN_SETTINGS_BUTTON_TEXT: "MAIS OPÇÕES",
      INIT_SCREEN_REJECT_BUTTON_TEXT: "EU NÃO ACEITO",
      INIT_SCREEN_ACCEPT_BUTTON_TEXT: "EU ACEITO",
      INIT_SCREEN_PURPOSE_LINK_TEXT: "Mostrar Finalidades",
      PURPOSE_SCREEN_TITLE_TEXT: "Damos valor à sua privacidade",
      PURPOSE_SCREEN_BODY_TEXT: "Com base nas finalidades que se seguem, pode definir as suas preferências de consentimento e determinar como deseja que os seus dados sejam utilizados. Pode definir as suas preferências relativas à nossa empresa de forma independente das de terceiros. Cada finalidade contém uma descrição para saber como nós e os nossos parceiros utilizamos os seus dados.",
      PURPOSE_SCREEN_VENDOR_LINK_TEXT: "Ver Fornecedores",
      PURPOSE_SCREEN_CANCEL_BUTTON_TEXT: "Cancelar",
      PURPOSE_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "Guardar e sair",
      VENDOR_SCREEN_TITLE_TEXT: "Damos valor à sua privacidade",
      VENDOR_SCREEN_BODY_TEXT: "Em seguida, pode definir as preferências de consentimento para parceiros terceiros com os quais trabalhamos. Para ajudar no momento da escolha, expanda cada item da lista de empresas para ver com que finalidade utilizam os dados. Em alguns casos, as empresas, com base nos seus interesses legítimos, podem utilizar os seus dados sem solicitar o seu consentimento. Clique nas ligações das respetivas políticas de privacidade para obter mais informações e para se opor a esse processamento.",
      REJECT_ALL_BUTTON_TEXT: "Rejeitar tudo",
      ACCEPT_ALL_BUTTON_TEXT: "Aceitar tudo",
      VENDOR_SCREEN_PURPOSES_LINK_TEXT: "Voltar para Finalidades",
      VENDOR_SCREEN_CANCEL_BUTTON_TEXT: "Cancelar",
      VENDOR_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "Guardar e sair",
      CONSENT_LINK_LABEL: "Privacidade",
      BACK_LABEL: "Anterior",
      VIEW_COMPANIES_LABEL: "Ver companhias",
      HIDE_COMPANIES_LABEL: "Ocultar companhias",
      THIRD_PARTY_VENDORS_LABEL: "Vendedores terceiros",
      ON_LABEL: "Ligar",
      OFF_LABEL: "Desligar",
      OFF_ON_LABEL: "Desligar/Ligar",
      OTHER: "Outros",
      NON_IAB_TITLE: "Fornecedores não IAB",
      DESCRIPTION: "Descrição do Fornecedor:",
      COMPANY_LABEL: "Companhia",
      REQUIRED_LABEL: "Obrigatório",
      PRIVACY_POLICY_LABEL: "Política de privacidade: ",
      PURPOSES_LABEL: "Finalidades (Consentimento)",
      FEATURES_LABEL: "Funcionalidades:",
      LEGITIMATE_INTEREST_PURPOSES_LABEL: "Finalidades (Interesses legítimos)",
      SOFT_OPT_IN_ALERT_TITLE_TEXT: "Your consent preferences have been saved.",
      SOFT_OPT_IN_ALERT_BODY_TEXT: "To withdraw your consent or change your preferences, please click on the <strong>Privacy</strong>button.",
      GOOGLE_PURPOSES_TEXT: "Permitir que a Google e os seus parceiros tecnológicos recolham dados e utilizem cookies para personalização e medição de anúncios."
    },
    ro: {
      INIT_SCREEN_TITLE_TEXT: "Pentru noi, confidențialitatea dvs. este importantă",
      INIT_SCREEN_BODY_TEXT: {
        1: "Noi și partenerii noștri utilizăm tehnologii, cum ar fi modulele cookie, și vă procesăm datele cu caracter personal, precum adresele IP și identificatorii cookie, pentru a personaliza anunțurile publicitare și conținutul în funcție de interesele dvs., pentru a măsura eficiența anunțurilor și a conținutului și pentru a obține informații despre publicul care a văzut anunțurile și conținutul. Faceți clic mai jos pentru a vă da consimțământul privind utilizarea acestei tehnologii și procesarea datelor dvs. cu caracter personal în aceste scopuri. Vă puteți răzgândi și puteți schimba opțiunile în orice moment, revenind la acest site.",
        2: "Noi și partenerii noștri vă procesăm datele cu caracter personal, cum ar fi adresele IP și identificatorii cookie, utilizând tehnologii precum cookie-urile, pentru a personaliza anunțurile publicitare și conținutul în funcție de interesele dvs., pentru a măsura eficiența anunțurilor și a conținutului și pentru a obține informații despre publicul care a văzut anunțurile și conținutul. Faceți clic mai jos pentru a vă da consimțământul sau pentru a alege care parteneri să vă proceseze datele și în ce scopuri. Puteți edita setările în orice moment.",
        3: "Calitatea conținutului și informațiile pe care vi le furnizăm depind de veniturile generate de publicitate. Noi și partenerii noștri vă utilizăm datele cu caracter personal, cum ar fi adresele IP și identificatorii cookie, pentru a personaliza anunțurile publicitare și conținutul în funcție de interesele dvs., pentru a măsura eficiența anunțurilor și a conținutului și pentru a obține informații despre publicul care a văzut anunțurile și conținutul. Faceți clic mai jos pentru a vă da acordul privind utilizarea cookie-urilor și procesarea datelor dvs. Vă puteți schimba opțiunile în orice moment.",
        softOptIn: "We and our partners use technologies, such as cookies, and process personal data, such as IP addresses and cookie identifiers, to personalise ads and content based on your interests, measure the performance of ads and content, and derive insights about the audiences who saw ads and content. Continue using this website or click below to consent to the use of this technology and the processing of your personal data for these purposes. You can change your mind and change your consent choices at any time by returning to this site."
      },
      INIT_SCREEN_SETTINGS_BUTTON_TEXT: "MAI MULTE OPȚIUNI",
      INIT_SCREEN_REJECT_BUTTON_TEXT: "NU SUNT DE ACORD",
      INIT_SCREEN_ACCEPT_BUTTON_TEXT: "Sunt de acord",
      INIT_SCREEN_PURPOSE_LINK_TEXT: "Afișați scopurile",
      PURPOSE_SCREEN_TITLE_TEXT: "Pentru noi, confidențialitatea dvs. este importantă",
      PURPOSE_SCREEN_BODY_TEXT: "Vă puteți seta preferințele de consimțământ și determina cum doriți să vă fie utilizate datele în funcție de scopurile de mai jos. Vă puteți seta preferințele pentru noi independent de cele pentru partenerii terți. Fiecare scop are o descriere, astfel încât să știți modul în care noi și partenerii noștri vă utilizăm datele.",
      PURPOSE_SCREEN_VENDOR_LINK_TEXT: "Vizualizați furnizorii",
      PURPOSE_SCREEN_CANCEL_BUTTON_TEXT: "Anulare",
      PURPOSE_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "Salvare și ieșire",
      VENDOR_SCREEN_TITLE_TEXT: "Pentru noi, confidențialitatea dvs. este importantă",
      VENDOR_SCREEN_BODY_TEXT: "Mai jos, puteți stabili preferințele de consimțământ pentru partenerii terți cu care lucrăm. Pentru a decide, deschideți fiecare element din lista companiei pentru a vedea scopurile în care utilizează datele. Este posibil ca, în unele cazuri, companiile să vă utilizeze datele fără a vă cere consimțământul, bazându-se pe interesele lor legitime. Puteți face clic pe linkurile politicilor de confidențialitate ale acestora pentru a afla mai multe informații și a vă opune unor astfel de procesări.",
      REJECT_ALL_BUTTON_TEXT: "RRESPINGEȚI-LE PE TOATE",
      ACCEPT_ALL_BUTTON_TEXT: "ACCEPTAȚI-LE PE TOATE",
      VENDOR_SCREEN_PURPOSES_LINK_TEXT: "Înapoi la Scopuri",
      VENDOR_SCREEN_CANCEL_BUTTON_TEXT: "Anulare",
      VENDOR_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "Salvare și ieșire",
      CONSENT_LINK_LABEL: "Confidențialitate",
      BACK_LABEL: "Înapoi",
      VIEW_COMPANIES_LABEL: "Vizualizare companii",
      HIDE_COMPANIES_LABEL: "Ascundere companii",
      THIRD_PARTY_VENDORS_LABEL: "Furnizori terți",
      ON_LABEL: "Activare",
      OFF_LABEL: "Dezactivare",
      OFF_ON_LABEL: "Dezactivare/Activare",
      OTHER: "Altul",
      NON_IAB_TITLE: "Furnizori non-IAB",
      DESCRIPTION: "Descriere furnizor:",
      COMPANY_LABEL: "Companie",
      REQUIRED_LABEL: "Obligatoriu",
      PRIVACY_POLICY_LABEL: "Politica de confidențialitate: ",
      PURPOSES_LABEL: "Scopuri (Consimțământ)",
      FEATURES_LABEL: "Funcții:",
      LEGITIMATE_INTEREST_PURPOSES_LABEL: "Scopuri (Interese legitime)",
      SOFT_OPT_IN_ALERT_TITLE_TEXT: "Your consent preferences have been saved.",
      SOFT_OPT_IN_ALERT_BODY_TEXT: "To withdraw your consent or change your preferences, please click on the <strong>Privacy</strong>button.",
      GOOGLE_PURPOSES_TEXT: "Permiteți companiei Google și partenerilor săi de tehnologie să colecteze date și să utilizeze cookie-uri pentru măsurări și personalizarea anunțurilor."
    },
    fi: {
      INIT_SCREEN_TITLE_TEXT: "Yksityisyytesi on meille tärkeää",
      INIT_SCREEN_BODY_TEXT: {
        1: "Me ja yhteistyökumppanimme käytämme tekniikoita, kuten evästeitä, ja käsittelemme henkilökohtaisia tietojasi, kuten IP-osoitteita ja evästetunnisteita, yksilöimään mainoksia ja sisältöä mielenkiintojesi kohteiden perusteella, sekä mitataksemme mainosten ja sisällön tehokkuutta sekä saadaksemme tietoa mainoksia ja sisältöä nähneistä yleisöistä. Napsauta alta, jos haluat hyväksyä tämän tekniikan käytön ja henkilötietojesi käsittelyn näihin tarkoituksiin. Mikäli muutat mielesi, voit muuttaa antamaasi suostumusta milloin tahansa palaamalla tälle sivustolle.",
        2: "Me ja yhteistyökumppanimme käsittelemme henkilökohtaisia tietojasi, kuten IP-osoitteita ja evästetunnisteita, käyttämällä tekniikoita, kuten evästeitä, jotta voimme muokata mainoksia ja sisältöä mielenkiintojesi kohteiden perusteella sekä mitataksemme mainosten ja sisällön tehokkuutta sekä saadaksemme tietoa mainoksia ja sisältöä nähneistä yleisöistä. Napsauta alta, jos haluat hyväksyä tai valita, mitkä kumppanit käsittelevät tietojasi ja mihin tarkoituksiin. Voit tehdä muutoksia asetuksiisi milloin tahansa.",
        3: "Laadukas sisältö ja tiedot, jotka annamme sinulle, riippuvat mainonnasta syntyvästä tulosta. Me ja yhteistyökumppanimme käytämme henkilökohtaisia tietojasi, kuten IP-osoitteita ja evästetunnisteita, voidaksemme muokata mainoksia ja sisältöä mielenkiintojesi kohteiden perusteella ja mitataksemme mainosten ja sisällön tehokkuutta sekä saadaksemme tietoa mainoksia ja sisältöä nähneistä yleisöistä. Napsauta alta, jos haluat hyväksyä evästeiden käytön ja tietojen käsittelyn. Voit tarkastella valintojasi milloin tahansa.",
        softOptIn: "We and our partners use technologies, such as cookies, and process personal data, such as IP addresses and cookie identifiers, to personalise ads and content based on your interests, measure the performance of ads and content, and derive insights about the audiences who saw ads and content. Continue using this website or click below to consent to the use of this technology and the processing of your personal data for these purposes. You can change your mind and change your consent choices at any time by returning to this site."
      },
      INIT_SCREEN_SETTINGS_BUTTON_TEXT: "LISÄÄ VAIHTOEHTOJA",
      INIT_SCREEN_REJECT_BUTTON_TEXT: "EN HYVÄKSY",
      INIT_SCREEN_ACCEPT_BUTTON_TEXT: "Hyväksyn",
      INIT_SCREEN_PURPOSE_LINK_TEXT: "Näytä tarkoitukset",
      PURPOSE_SCREEN_TITLE_TEXT: "Yksityisyytesi on meille tärkeää",
      PURPOSE_SCREEN_BODY_TEXT: "Voit asettaa suostumusasetuksesi ja määrittää, miten haluat tietojasi käytettävän alla olevien tarkoitusten perusteella. Voit asettaa meitä koskevat asetuksesi riippumatta kolmannen osapuolen yhteistyökumppaneita koskevista asetuksista. Jokaisella tarkoituksella on kuvaus, jotta tiedät, miten me ja yhteistyökumppanimme käytämme tietojasi.",
      PURPOSE_SCREEN_VENDOR_LINK_TEXT: "Katso toimittajat",
      PURPOSE_SCREEN_CANCEL_BUTTON_TEXT: "Peruuta",
      PURPOSE_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "Tallenna ja poistu",
      VENDOR_SCREEN_TITLE_TEXT: "Yksityisyytesi on meille tärkeää",
      VENDOR_SCREEN_BODY_TEXT: "Voit määrittää alla suostumusasetukset yksittäisille yhteistyökumppaneina toimiville kolmansille osapuolille, joiden kanssa työskentelemme. Jotta voit tehdä valintasi, laajenna jokainen yritysluettelon kohde nähdäksesi mihin tarkoituksiin he käyttävät tietojasi. Joissakin tapauksissa yritykset voivat oikeutettujen etujensa perusteella käyttää tietojasi pyytämättä suostumustasi. Voit napsauttaa heidän tietosuojakäytäntölinkkejään saadaksesi lisätietoja ja vastustaaksesi tällaista käsittelyä.",
      REJECT_ALL_BUTTON_TEXT: "HYLKÄÄ KAIKKI",
      ACCEPT_ALL_BUTTON_TEXT: "HYVÄKSY KAIKKI",
      VENDOR_SCREEN_PURPOSES_LINK_TEXT: "Takaisin tarkoituksiin",
      VENDOR_SCREEN_CANCEL_BUTTON_TEXT: "Peruuta",
      VENDOR_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "Tallenna ja poistu",
      CONSENT_LINK_LABEL: "Yksityisyys",
      BACK_LABEL: "Takaisin",
      VIEW_COMPANIES_LABEL: "Katso yritykset",
      HIDE_COMPANIES_LABEL: "Piilota yritykset",
      THIRD_PARTY_VENDORS_LABEL: "Kolmannen osapuolen myyjät",
      ON_LABEL: "Päälle",
      OFF_LABEL: "Pois",
      OFF_ON_LABEL: "Pois/Päälle",
      OTHER: "Muut",
      NON_IAB_TITLE: "Ei IAB-toimittajat",
      DESCRIPTION: "Toimittajan kuvaus:",
      COMPANY_LABEL: "Yritys",
      REQUIRED_LABEL: "Vaaditaan",
      PRIVACY_POLICY_LABEL: "Tietosuojaseloste: ",
      PURPOSES_LABEL: "Tarkoitukset (suostumus)",
      FEATURES_LABEL: "Ominaisuudet:",
      LEGITIMATE_INTEREST_PURPOSES_LABEL: "Tarkoitukset (oikeutetut edut)",
      SOFT_OPT_IN_ALERT_TITLE_TEXT: "Your consent preferences have been saved.",
      SOFT_OPT_IN_ALERT_BODY_TEXT: "To withdraw your consent or change your preferences, please click on the <strong>Privacy</strong>button.",
      GOOGLE_PURPOSES_TEXT: "Salli Googlen ja sen teknologiakumppaneiden kerätä tietoja ja käyttää evästeitä mainosten mukauttamiseen ja mittaamiseen."
    },
    pl: {
      INIT_SCREEN_TITLE_TEXT: "Szanujemy Twoją prywatność",
      INIT_SCREEN_BODY_TEXT: {
        1: "My i nasi partnerzy wykorzystujemy technologie, takie jak pliki cookie, i przetwarzamy dane osobowe, takie jak adresy IP i identyfikatory plików cookie, w celu spersonalizowania reklam i treści w oparciu o Twoje zainteresowania, mierzenia wydajności reklam i treści oraz uzyskiwania wglądu w odbiorców, którzy widzieli reklamy i treści. Kliknij poniżej, aby wyrazić zgodę na wykorzystanie tej technologii i przetwarzanie danych osobowych w tych celach. Możesz zmienić zdanie i zmienić wybór zgody w dowolnym momencie, wracając na tę stronę.",
        2: "My i nasi partnerzy przetwarzamy Twoje dane osobowe, takie jak adresy IP i identyfikatory plików cookie, używając technologii takich jak pliki cookie, aby spersonalizować reklamy i treści w oparciu o Twoje zainteresowania, zmierzyć wydajność reklam i treści oraz uzyskać informacje o odbiorcach, którzy widzieli reklamy i treści. Kliknij poniżej, aby wyrazić zgodę lub wybrać, którzy Partnerzy przetwarzają Twoje dane i do jakich celów. Możesz dokonać zmian w swoich ustawieniach w dowolnym momencie.",
        3: "Jakość treści i informacje, które przekazujemy, zależą od przychodów generowanych przez reklamę. My i nasi partnerzy wykorzystujemy Twoje dane osobowe, takie jak adresy IP i identyfikatory plików cookie, w celu spersonalizowania reklam i treści na podstawie Twoich zainteresowań, pomiaru wydajności reklam i treści oraz uzyskania informacji o odbiorcach, którzy obejrzeli reklamy i treści. Kliknij poniżej, aby wyrazić zgodę na używanie plików cookie i przetwarzanie Twoich danych. Możesz powrócić do swoich wyborów w dowolnym momencie.",
        softOptIn: "We and our partners use technologies, such as cookies, and process personal data, such as IP addresses and cookie identifiers, to personalise ads and content based on your interests, measure the performance of ads and content, and derive insights about the audiences who saw ads and content. Continue using this website or click below to consent to the use of this technology and the processing of your personal data for these purposes. You can change your mind and change your consent choices at any time by returning to this site."
      },
      INIT_SCREEN_SETTINGS_BUTTON_TEXT: "WIĘCEJ OPCJI",
      INIT_SCREEN_REJECT_BUTTON_TEXT: "NIE AKCEPTUJĘ",
      INIT_SCREEN_ACCEPT_BUTTON_TEXT: "AKCEPTUJĘ",
      INIT_SCREEN_PURPOSE_LINK_TEXT: "Pokaż cele",
      PURPOSE_SCREEN_TITLE_TEXT: "Szanujemy Twoją prywatność",
      PURPOSE_SCREEN_BODY_TEXT: "Możesz ustawić preferencje dotyczące zgody i określić, w jaki sposób chcesz, aby Twoje dane były używane w oparciu o poniższe cele. Możesz ustawić swoje preferencje dla nas niezależnie od preferencji partnerów zewnętrznych. Każdy cel zawiera opis, dzięki któremu wiesz, jak my i partnerzy korzystamy z Twoich danych.",
      PURPOSE_SCREEN_VENDOR_LINK_TEXT: "Zobacz dostawców",
      PURPOSE_SCREEN_CANCEL_BUTTON_TEXT: "Anuluj",
      PURPOSE_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "Zapisz i zamknij",
      VENDOR_SCREEN_TITLE_TEXT: "Szanujemy Twoją prywatność",
      VENDOR_SCREEN_BODY_TEXT: "Możesz ustawić preferencje zgody dla poszczególnych partnerów zewnętrznych, z którymi współpracujemy poniżej. Rozwiń każdy element listy firm, aby sprawdzić, do jakich celów wykorzystują dane, aby pomóc w dokonaniu wyboru. W niektórych przypadkach firmy mogą wykorzystywać dane użytkownika bez pytania o zgodę w oparciu o ich uzasadnione interesy. Możesz kliknąć ich linki polityki prywatności, aby uzyskać więcej informacji i sprzeciwić się takiemu przetwarzaniu.",
      REJECT_ALL_BUTTON_TEXT: "ODRZUĆ WSZYSTKIE",
      ACCEPT_ALL_BUTTON_TEXT: "AKCEPTUJ WSZYSTKIE",
      VENDOR_SCREEN_PURPOSES_LINK_TEXT: "Powrót do celów",
      VENDOR_SCREEN_CANCEL_BUTTON_TEXT: "Anuluj",
      VENDOR_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "Zapisz i zamknij",
      CONSENT_LINK_LABEL: "Prywatność",
      BACK_LABEL: "Wstecz",
      VIEW_COMPANIES_LABEL: "Pokaż firmy",
      HIDE_COMPANIES_LABEL: "Ukryj firmy",
      THIRD_PARTY_VENDORS_LABEL: "Zaangażowane strony trzecie",
      ON_LABEL: "Włącz",
      OFF_LABEL: "Wyłącz",
      OFF_ON_LABEL: "Wyłącz/Włącz",
      OTHER: "Inny",
      NON_IAB_TITLE: "Dostawcy spoza IAB",
      DESCRIPTION: "Opis dostawcy:",
      COMPANY_LABEL: "Firma",
      REQUIRED_LABEL: "Wymagane",
      PRIVACY_POLICY_LABEL: "Zasady ochrony prywatności: ",
      PURPOSES_LABEL: "Cele (zgoda)",
      FEATURES_LABEL: "Funkcje:",
      LEGITIMATE_INTEREST_PURPOSES_LABEL: "Cele (uzasadnione interesy)",
      SOFT_OPT_IN_ALERT_TITLE_TEXT: "Your consent preferences have been saved.",
      SOFT_OPT_IN_ALERT_BODY_TEXT: "To withdraw your consent or change your preferences, please click on the <strong>Privacy</strong>button.",
      GOOGLE_PURPOSES_TEXT: "Pozwól Google i partnerom technologicznym tej firmy na gromadzenie danych i wykorzystywanie plików cookie do personalizacji i pomiaru reklam."
    },
    sk: {
      INIT_SCREEN_TITLE_TEXT: "Vážime si vaše súkromie",
      INIT_SCREEN_BODY_TEXT: {
        1: "My a naši partneri používame technológie, ako napríklad súbory cookie, a spracúvame osobné údaje, ako sú adresy IP a identifikátory súborov cookie, na prispôsobenie reklám a obsahu na základe vašich záujmov, meranie výkonnosti reklám a obsahu a získanie informácií o používateľoch, ktorí videli konkrétne reklamy a obsah. Kliknutím nižšie potvrdzujete svoj súhlas s používaním tejto technológie a so spracúvaním svojich osobných údajov na tieto účely. Svoj názor môžete kedykoľvek zmeniť a svoj súhlas zrušiť po návrate na túto stránku.",
        2: "My a naši partneri spracúvame vaše osobné údaje, ako sú adresy IP a identifikátory súborov cookie, pomocou technológie, akou je napríklad používanie súborov cookie, aby sme prispôsobili reklamy a obsah vašim záujmom, merali výkonnosť reklám a obsahu a získali prehľad o používateľoch, ktorí videli konkrétne reklamy a obsah. Kliknutím nižšie potvrdíte svoj súhlas, prípadne sa môžete rozhodnúť, ktorí partneri budú spracúvať vaše údaje a na aké účely. Tieto nastavenia môžete kedykoľvek zmeniť.",
        3: "Kvalitný obsah a informácie, ktoré vám poskytujeme, závisia od našich príjmov z reklamy. My a naši partneri používame vaše osobné údaje, ako sú adresy IP a identifikátory súborov cookie, aby sme mohli prispôsobiť reklamy a obsah na základe vašich záujmov, merať výkonnosť reklám a obsahu a získať prehľad o používateľoch, ktorí videli konkrétne reklamy a obsah. Kliknutím nižšie súhlasíte s používaním súborov cookie a spracúvaním svojich údajov. Svoje rozhodnutie môžete kedykoľvek zmeniť.",
        softOptIn: "We and our partners use technologies, such as cookies, and process personal data, such as IP addresses and cookie identifiers, to personalise ads and content based on your interests, measure the performance of ads and content, and derive insights about the audiences who saw ads and content. Continue using this website or click below to consent to the use of this technology and the processing of your personal data for these purposes. You can change your mind and change your consent choices at any time by returning to this site."
      },
      INIT_SCREEN_SETTINGS_BUTTON_TEXT: "VIAC MOŽNOSTÍ",
      INIT_SCREEN_REJECT_BUTTON_TEXT: "NESÚHLASÍM",
      INIT_SCREEN_ACCEPT_BUTTON_TEXT: "Súhlasím",
      INIT_SCREEN_PURPOSE_LINK_TEXT: "Zobraziť účely",
      PURPOSE_SCREEN_TITLE_TEXT: "Vážime si vaše súkromie",
      PURPOSE_SCREEN_BODY_TEXT: "Na základe nižšie uvedených účelov môžete upraviť preferencie svojho súhlasu týkajúce sa používania vašich údajov. Svoje preferencie pre naše používanie vašich údajov môžete nastaviť nezávisle od preferencií v súvislosti s externými partnermi. Každý účel má svoj opis, aby ste vedeli, ako my a naši partneri používame vaše údaje.",
      PURPOSE_SCREEN_VENDOR_LINK_TEXT: "Zobraziť dodávateľov",
      PURPOSE_SCREEN_CANCEL_BUTTON_TEXT: "Zrušiť",
      PURPOSE_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "Uložiť a skončiť",
      VENDOR_SCREEN_TITLE_TEXT: "Vážime si vaše súkromie",
      VENDOR_SCREEN_BODY_TEXT: "Preferencie v súvislosti so súhlasom môžete nastaviť pre jednotlivých externých partnerov, s ktorými spolupracujeme. Rozbaľte každú položku zoznamu spoločností a prečítajte si, na aké účely používajú údaje. To vám môže pomôcť pri výbere nastavení. V niektorých prípadoch môžu spoločnosti používať vaše údaje bez toho, aby požiadali o váš súhlas. Môžu tak robiť na základe svojich oprávnených záujmov. Pre ďalšie informácie a námietky voči takémuto spracúvaniu môžete kliknúť na príslušné prepojenia na ich zásady ochrany osobných údajov.",
      REJECT_ALL_BUTTON_TEXT: "Odmietnuť všetko",
      ACCEPT_ALL_BUTTON_TEXT: "Prijať všetko",
      VENDOR_SCREEN_PURPOSES_LINK_TEXT: "Späť na účely",
      VENDOR_SCREEN_CANCEL_BUTTON_TEXT: "Zrušiť",
      VENDOR_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "Uložiť a skončiť",
      CONSENT_LINK_LABEL: "Súkromie",
      BACK_LABEL: "Späť",
      VIEW_COMPANIES_LABEL: "Zobraziť spoločnosti",
      HIDE_COMPANIES_LABEL: "Skryť spoločnosti",
      THIRD_PARTY_VENDORS_LABEL: "Predajcovia tretích strán",
      ON_LABEL: "Zap.",
      OFF_LABEL: "Vyp.",
      OFF_ON_LABEL: "Vyp./Zap.",
      OTHER: "Iné",
      NON_IAB_TITLE: "Dodávatelia bez IAB",
      DESCRIPTION: "Opis dodávateľa:",
      COMPANY_LABEL: "Spoločnosť",
      REQUIRED_LABEL: "Vyžadované",
      PRIVACY_POLICY_LABEL: "Zásady ochrany osobných údajov: ",
      PURPOSES_LABEL: "Účely (súhlas)",
      FEATURES_LABEL: "Funkcie:",
      LEGITIMATE_INTEREST_PURPOSES_LABEL: "Účely (oprávnené záujmy)",
      SOFT_OPT_IN_ALERT_TITLE_TEXT: "Your consent preferences have been saved.",
      SOFT_OPT_IN_ALERT_BODY_TEXT: "To withdraw your consent or change your preferences, please click on the <strong>Privacy</strong>button.",
      GOOGLE_PURPOSES_TEXT: "Umožnite spoločnosti Google a jej technologickým partnerom zhromažďovať údaje a používať súbory cookie na prispôsobenie reklám a meranie."
    },
    sv: {
      INIT_SCREEN_TITLE_TEXT: "Vi värdesätter din integritet",
      INIT_SCREEN_BODY_TEXT: {
        1: "Vi och våra samarbetspartner använder teknologi såsom cookies för att behandla personuppgifter, exempelvis IP-adresser och cookie-identifierare, för att anpassa annonser och innehåll enligt dina intressen, mäta effektiviteten hos annonser och innehåll samt härleda information om de personer som sett annonserna och innehållet. Klicka nedan för att godkänna användningen av denna teknologi och behandling av dina personuppgifter för dessa ändamål. Du kan när som helst ändra dina val gällande samtycke genom att återkomma till denna sida.",
        2: "Vi och våra samarbetspartner behandlar dina personuppgifter, exempelvis IP-adresser och cookie-identifierare, med hjälp av teknologi såsom cookies för att anpassa annonser och innehåll enligt dina intressen, mäta effektiviteten hos annonser och innehåll samt härleda information om de personer som sett annonserna och innehållet. Klicka nedan för att godkänna eller för att välja vilka samarbetspartner som får behandla dina data för vilka ändamål. Du kan när som helst ändra dina inställningar.",
        3: "Kvaliteten på det innehåll och den information vi erbjuder dig beror på den inkomst vi får från annonser. Vi och våra samarbetspartner använder dina personuppgifter, exempelvis IP-adresser och cookie-identifierare, för att anpassa annonser och innehåll enligt dina intressen, mäta effektiviteten hos annonser och innehåll samt härleda information om de personer som sett annonserna och innehållet. Klicka nedan för att godkänna användning av cookies och behandling av dina uppgifter. Du kan när som helst återkomma för att ändra dina val.",
        softOptIn: "We and our partners use technologies, such as cookies, and process personal data, such as IP addresses and cookie identifiers, to personalise ads and content based on your interests, measure the performance of ads and content, and derive insights about the audiences who saw ads and content. Continue using this website or click below to consent to the use of this technology and the processing of your personal data for these purposes. You can change your mind and change your consent choices at any time by returning to this site."
      },
      INIT_SCREEN_SETTINGS_BUTTON_TEXT: "FLER ALTERNATIV",
      INIT_SCREEN_REJECT_BUTTON_TEXT: "JAG GODKÄNNER INTE",
      INIT_SCREEN_ACCEPT_BUTTON_TEXT: "JAG GODKÄNNER",
      INIT_SCREEN_PURPOSE_LINK_TEXT: "Visa ändamål",
      PURPOSE_SCREEN_TITLE_TEXT: "Vi värderar din integritet",
      PURPOSE_SCREEN_BODY_TEXT: "Du kan ange dina samtyckespreferenser och avgöra hur du vill att dina data ska användas utifrån ändamålen nedan. Du kan ange separata preferenser för oss och tredje parter. Varje ändamål har en beskrivning så att du kan se hur vi och våra samarbetspartner använder dina uppgifter.",
      PURPOSE_SCREEN_VENDOR_LINK_TEXT: "Visa säljare",
      PURPOSE_SCREEN_CANCEL_BUTTON_TEXT: "Avbryt",
      PURPOSE_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "Spara & Avsluta",
      VENDOR_SCREEN_TITLE_TEXT: "Vi värderar din integritet",
      VENDOR_SCREEN_BODY_TEXT: "Du kan ange samtyckespreferenser för de enskilda tredje parter vi samarbetar med nedan. Du kan maximera informationen om företagen på listan för att se för vilka ändamål de använder uppgifter och på så sätt få hjälp att göra dina val. I vissa fall kan företag använda dina data utan att be om ditt samtycke, med stöd av sina legitima intressen. Du kan klicka på länkarna till deras integritetspolicyer för att få mer information och för att neka till sådan användning.",
      REJECT_ALL_BUTTON_TEXT: "AVVISA ALLA",
      ACCEPT_ALL_BUTTON_TEXT: "GODKÄNN ALLA",
      VENDOR_SCREEN_PURPOSES_LINK_TEXT: "Tillbaka till ändamål",
      VENDOR_SCREEN_CANCEL_BUTTON_TEXT: "Avbryt",
      VENDOR_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "Spara och Avsluta",
      CONSENT_LINK_LABEL: "Integritet",
      BACK_LABEL: "Tillbaka",
      VIEW_COMPANIES_LABEL: "Visa företag",
      HIDE_COMPANIES_LABEL: "Göm företag",
      THIRD_PARTY_VENDORS_LABEL: "Tredjepartsleverantörer",
      ON_LABEL: "På",
      OFF_LABEL: "Av",
      OFF_ON_LABEL: "Av/På",
      OTHER: "Övriga",
      NON_IAB_TITLE: "Icke-IAB-säljare",
      DESCRIPTION: "Beskrivning av säljaren:",
      COMPANY_LABEL: "Företag",
      REQUIRED_LABEL: "Vad som krävs",
      PRIVACY_POLICY_LABEL: "Integritetspolicy: ",
      PURPOSES_LABEL: "Ändamål (samtycke)",
      FEATURES_LABEL: "Funktioner:",
      LEGITIMATE_INTEREST_PURPOSES_LABEL: "Ändamål (legitima intressen)",
      SOFT_OPT_IN_ALERT_TITLE_TEXT: "Your consent preferences have been saved.",
      SOFT_OPT_IN_ALERT_BODY_TEXT: "To withdraw your consent or change your preferences, please click on the <strong>Privacy</strong>button.",
      GOOGLE_PURPOSES_TEXT: "Tillåt Google och deras teknologipartner att samla in data och använda cookies för personanpassning av annonser och mätningar."
    },
    ru: {
      INIT_SCREEN_TITLE_TEXT: "Мы с большим уважением относимся к Bашей конфиденциальности",
      INIT_SCREEN_BODY_TEXT: {
        1: "Мы и наши партнеры используем технологии, такие как cookie-файлы, и обрабатываем персональные данные, включая IP-адреса и идентификаторы cookie-файлов, чтобы персонализировать рекламу и контент в соответствии с вашими интересами, оценивать эффективность рекламы и контента, а также получать представление об аудитории, которая просматривает рекламу и контент. Нажмите ниже, чтобы дать согласие на использование этой технологии и обработку ваших персональных данных в этих целях. Вы можете в любой момент изменить свое решение и отказаться, вернувшись на этот сайт.",
        2: "Мы и наши партнеры обрабатываем ваши персональные данные, включая IP-адреса и идентификаторы cookie-файлов, с использованием таких технологий, как cookie-файлы, чтобы персонализировать рекламу и контент в соответствии с вашими интересами, оценивать эффективность рекламы и контента, а также получать представление об аудитории, которая просматривает рекламу и контент. Нажмите ниже, чтобы дать согласие или выбрать, какие партнеры смогут обрабатывать ваши данные и для каких целей. Вы можете изменить настройки в любое время.",
        3: "Предоставляемый контент и информация зависят от дохода, который мы получаем от рекламы. Мы и наши партнеры используем ваши персональные данные, включая IP-адреса и идентификаторы cookie-файлов, чтобы персонализировать рекламу и контент в соответствии с вашими интересами, оценивать эффективность рекламы и контента, а также получать представление об аудитории, которая просматривает рекламу и контент. Нажмите ниже, чтобы дать согласие на использование cookie-файлов и обработку ваших данных. Вы можете изменить свое решение в любое время.",
        softOptIn: "We and our partners use technologies, such as cookies, and process personal data, such as IP addresses and cookie identifiers, to personalise ads and content based on your interests, measure the performance of ads and content, and derive insights about the audiences who saw ads and content. Continue using this website or click below to consent to the use of this technology and the processing of your personal data for these purposes. You can change your mind and change your consent choices at any time by returning to this site."
      },
      INIT_SCREEN_SETTINGS_BUTTON_TEXT: "БОЛЬШЕ ВАРИАНТОВ",
      INIT_SCREEN_REJECT_BUTTON_TEXT: "Я НЕ СОГЛАСЕН / НЕ СОГЛАСНА",
      INIT_SCREEN_ACCEPT_BUTTON_TEXT: "Я даю согласие",
      INIT_SCREEN_PURPOSE_LINK_TEXT: "Показать цели",
      PURPOSE_SCREEN_TITLE_TEXT: "Мы с большим уважением относимся к Bашей конфиденциальности",
      PURPOSE_SCREEN_BODY_TEXT: "Вы можете установить настройки и решить, хотите ли вы, чтобы ваши данные использовались в указанных ниже целях. Вы можете установить настройки для нас отдельно от сторонних партнеров. Каждая цель подробно описана, чтобы вы знали, как мы и партнеры используем ваши данные.",
      PURPOSE_SCREEN_VENDOR_LINK_TEXT: "Посмотреть поставщиков",
      PURPOSE_SCREEN_CANCEL_BUTTON_TEXT: "Отменить",
      PURPOSE_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "Сохранить и выйти",
      VENDOR_SCREEN_TITLE_TEXT: "Мы с большим уважением относимся к Bашей конфиденциальности",
      VENDOR_SCREEN_BODY_TEXT: "Ниже вы можете установить настройки для отдельных сторонних партнеров, с которыми мы работаем. Разверните каждый элемент списка компаний, чтобы узнать, для каких целей они используют данные. В некоторых случаях компании могут использовать ваши данные без вашего согласия, исходя из своих законных интересов. Вы можете перейти по ссылкам на их политики конфиденциальности, чтобы получить дополнительную информацию и отказаться от обработки.",
      REJECT_ALL_BUTTON_TEXT: "ОТКЛОНИТЬ ВСЁ",
      ACCEPT_ALL_BUTTON_TEXT: "ПРИНЯТЬ ВСЁ",
      VENDOR_SCREEN_PURPOSES_LINK_TEXT: "Вернуться к алгоритму",
      VENDOR_SCREEN_CANCEL_BUTTON_TEXT: "Отменить",
      VENDOR_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "Сохранить и выйти",
      CONSENT_LINK_LABEL: "Конфиденциальность",
      BACK_LABEL: "Назад",
      VIEW_COMPANIES_LABEL: "Показать компании",
      HIDE_COMPANIES_LABEL: "Скрыть компании",
      THIRD_PARTY_VENDORS_LABEL: "Сторонние поставщики",
      ON_LABEL: "Вкл.",
      OFF_LABEL: "Выкл.",
      OFF_ON_LABEL: "Выкл./Вкл.",
      OTHER: "Другое",
      NON_IAB_TITLE: "Сторонние поставщики",
      DESCRIPTION: "Описание поставщика:",
      COMPANY_LABEL: "Компания",
      REQUIRED_LABEL: "Обязательное поле",
      PRIVACY_POLICY_LABEL: "Политика конфиденциальности: ",
      PURPOSES_LABEL: "Цели (согласие)",
      FEATURES_LABEL: "Особенности:",
      LEGITIMATE_INTEREST_PURPOSES_LABEL: "Цели (законные интересы)",
      SOFT_OPT_IN_ALERT_TITLE_TEXT: "RUSO !Your consent preferences have been saved.",
      SOFT_OPT_IN_ALERT_BODY_TEXT: "To withdraw your consent or change your preferences, please click on the Privacy <strong>Privacy</strong>button.",
      GOOGLE_PURPOSES_TEXT: "Разрешить компании Google и ее технологическим партнерам собирать данные и использовать cookie-файлы для персонализации и оценки рекламы."
    },
    no: {
      INIT_SCREEN_TITLE_TEXT: "Vi verdsetter personvernet ditt",
      INIT_SCREEN_BODY_TEXT: {
        1: "Vi og partnerne våre bruker teknologier, for eksempel informasjonskapsler, og behandler personlige data, for eksempel IP-adresser og informasjonskapsler, for å tilpasse annonser og innhold basert på interessene dine, måle resultatene til annonser og innhold, og få innsikt om publikum som tittet på annonser og innhold. Klikk nedenfor for å samtykke til bruken av denne teknologien og behandlingen av de personlige dataene dine for disse formålene. Du kan ombestemme deg og endre samtykkevalgene dine når som helst ved å returnere til dette nettstedet.",
        2: "Vi og partnerne våre behandler de personlige dataene dine, for eksempel IP-adresser og informasjonskapsler, ved hjelp av teknologi som informasjonskapsler for å tilpasse annonser og innhold basert på interessene dine, måle resultatene til annonser og innhold, og få innsikt om publikum som tittet på annonser og innhold. Klikk nedenfor for å samtykke eller velge hvilke partnere som behandler dataene dine og for hvilke formål. Du kan når som helst endre innstillingene dine.",
        3: "Kvalitetsinnholdet og informasjonen vi gir deg, avhenger av inntektene vi genererer fra annonsering. Vi og partnerne våre bruker de personlige dataene dine, for eksempel IP-adresser og informasjonskapsler, ved hjelp av teknologi som informasjonskapsler for å måle resultatene til annonser og innhold, og få innsikt om publikum som tittet på annonser og innhold. Klikk nedenfor for å samtykke til bruken av informasjonskapsler og behandlingen av dataene dine. Du kan når som helst gå tilbake til valgene dine.",
        softOptIn: "We and our partners use technologies, such as cookies, and process personal data, such as IP addresses and cookie identifiers, to personalise ads and content based on your interests, measure the performance of ads and content, and derive insights about the audiences who saw ads and content. Continue using this website or click below to consent to the use of this technology and the processing of your personal data for these purposes. You can change your mind and change your consent choices at any time by returning to this site."
      },
      INIT_SCREEN_SETTINGS_BUTTON_TEXT: "FLERE VALG",
      INIT_SCREEN_REJECT_BUTTON_TEXT: "JEG AKSEPTERER IKKE",
      INIT_SCREEN_ACCEPT_BUTTON_TEXT: "JEG AKSEPTERER",
      INIT_SCREEN_PURPOSE_LINK_TEXT: "Vis formål",
      PURPOSE_SCREEN_TITLE_TEXT: "Vi verdsetter personvernet ditt",
      PURPOSE_SCREEN_BODY_TEXT: "Du kan angi samtykkepreferansene dine og bestemme hvordan du vil at dataene skal brukes, basert på formålene nedenfor. Du kan angi preferansene dine uavhengig av tredjepartspartnere. Hvert formål har en beskrivelse slik at du vet hvordan vi og partnerne bruker dataene dine.",
      PURPOSE_SCREEN_VENDOR_LINK_TEXT: "Se leverandører",
      PURPOSE_SCREEN_CANCEL_BUTTON_TEXT: "Avbryt",
      PURPOSE_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "LAGRE OG AVSLUTT",
      VENDOR_SCREEN_TITLE_TEXT: "Vi verdsetter personvernet ditt",
      VENDOR_SCREEN_BODY_TEXT: "Du kan angi samtykkepreferanser for de individuelle tredjepartspartnerne vi jobber med nedenfor. Utvid hvert selskapslisteelement for å se hvilke formål de bruker dataene for å bidra til å foreta valgene dine. I noen tilfeller kan selskaper bruke dataene dine uten å be om samtykke fra deg, basert på deres legitime interesser. Du kan klikke på deres personvernregler-lenker for mer informasjon og motsette deg slik behandling.",
      REJECT_ALL_BUTTON_TEXT: "AVVIS ALT",
      ACCEPT_ALL_BUTTON_TEXT: "AKSEPTER ALT",
      VENDOR_SCREEN_PURPOSES_LINK_TEXT: "Vis formål",
      VENDOR_SCREEN_CANCEL_BUTTON_TEXT: "Avbryt",
      VENDOR_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "LAGRE OG AVSLUTT",
      CONSENT_LINK_LABEL: "Personvern",
      BACK_LABEL: "Tilbake",
      VIEW_COMPANIES_LABEL: "Vis selskaper",
      HIDE_COMPANIES_LABEL: "Skjul selskaper",
      THIRD_PARTY_VENDORS_LABEL: "Tredjepartsleverandører",
      ON_LABEL: "På",
      OFF_LABEL: "Av",
      OFF_ON_LABEL: "Av/På",
      OTHER: "Annet",
      COMPANY_LABEL: "Selskap",
      NON_IAB_TITLE: "Ikke-IAB-leverandører",
      DESCRIPTION: "Leverandørbeskrivelse:",
      REQUIRED_LABEL: "Obligatorisk",
      PRIVACY_POLICY_LABEL: "Personvernregler:",
      PURPOSES_LABEL: "Formål (samtykke)",
      FEATURES_LABEL: "Egenskaper",
      LEGITIMATE_INTEREST_PURPOSES_LABEL: "Formål (legitime interesser)",
      SOFT_OPT_IN_ALERT_TITLE_TEXT: "Your consent preferences have been saved.",
      SOFT_OPT_IN_ALERT_BODY_TEXT: "To withdraw your consent or change your preferences, please click on the <strong>Privacy</strong>button.",
      GOOGLE_PURPOSES_TEXT: "Tillat Google og deres teknologipartnere å samle inn data og bruke informasjonskapsler for annonsetilpassing og -måling."
    },
    ar: {
      INIT_SCREEN_TITLE_TEXT: "خصوصيتك تهمنا",
      INIT_SCREEN_BODY_TEXT: {
        1: "نستخدم نحن وشركاؤنا ملفات التعريف على موقعنا بهدف تخصيص المحتوى والإعلانات المبوبة. كما يمكننا عن طريقها تزويد الصفحة بأيقونات وسائل التواصل الاجتماعي المختلفة. باستخدام هذه الخاصية يمكننا السيطرة على انتقاء زوار الصفحة.أنقر أدناه للموافقة على استخدام هذه التقنية عبر الويب يمكنك تغيير قرارك عبر تغيير خيارات الموافقة الموجودة على الموقع في جميع الأوقات.",
        2: "نحن وشركاؤنا نعالج البيانات الشخصية عن طريق استخدام التكنولوجيا المعلوماتية للتعرف على ما يحلوا لزوار الصفحة مما يساعد الفريق الصحفي على اتخاذ قراراته التحريرية. ولديك مطلق الحرية في اختيار من يستخدم بياناتك ولأي هدف. كما يمكنك العودة لتغيير بياناتك الشخصية على الصفحة في أي وقت أردت",
        3: "تعتمد جودة المعلومات التي نقدمها لك على الأرباح التي نحققها من الإعلانات. نحن وشركاؤنا نستخدم بياناتك الشخصية لتزويدك بالإعلانات التي تهمك ومعرفة الموضوعات التي تهمك على موقعنا ونسبة نشاطك. إذا وافقت على استخدام بياناتك الشخصية للأهداف السابقة فقط أنقر أدناه، يمكنك تغيير اختيارك في أي وقت.",
        softOptIn: "We and our partners use technologies, such as cookies, and process personal data, such as IP addresses and cookie identifiers, to personalise ads and content based on your interests, measure the performance of ads and content, and derive insights about the audiences who saw ads and content. Continue using this website or click below to consent to the use of this technology and the processing of your personal data for these purposes. You can change your mind and change your consent choices at any time by returning to this site."
      },
      INIT_SCREEN_SETTINGS_BUTTON_TEXT: "Settings",
      INIT_SCREEN_REJECT_BUTTON_TEXT: "غير موافق",
      INIT_SCREEN_ACCEPT_BUTTON_TEXT: "موافق",
      INIT_SCREEN_PURPOSE_LINK_TEXT: "اظهار الاستخدامات",
      PURPOSE_SCREEN_TITLE_TEXT: "خصوصيتك تهمنا",
      PURPOSE_SCREEN_BODY_TEXT: "يمكنك تحديد كيفية استخدام بياناتك الشخصية وفقا للأدوات الموضحة أدناه. يمكنك أيضا اختيار قائمتك المفضلة بشكل مستقل بعيدا عن شركاء الطرف الثالث كل غرض له تعريف مفصل لكي تتعرف على كيفية استخدامنا لبياناتك الشخصية",
      PURPOSE_SCREEN_VENDOR_LINK_TEXT: "تعرف على قائمة المشاركين",
      PURPOSE_SCREEN_CANCEL_BUTTON_TEXT: "حذف",
      PURPOSE_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "حفظ وخروج",
      VENDOR_SCREEN_TITLE_TEXT: "خصوصيتك تهمنا",
      VENDOR_SCREEN_BODY_TEXT: "يمكنك التعرف على خواص كل شركة على حدا فيما يلي. هناك قائمة خاصة بكل شركة لمعرفة كيفية استخدامهم لبياناتك الشخصية. في بعض الحالات تتعرف الشركات على بياناتك الخاصة دون استئذانك سعيا لتقديم ما هو أفضل. أنقر هنا للتعرف على سياسات الخصوصية والمعلومات لاختيار ما يناسبك.",
      REJECT_ALL_BUTTON_TEXT: "غير موافق على كل ما سبق",
      ACCEPT_ALL_BUTTON_TEXT: "أوافق على كل ما سبق",
      VENDOR_SCREEN_PURPOSES_LINK_TEXT: "العودة إلى الاستخدامات",
      VENDOR_SCREEN_CANCEL_BUTTON_TEXT: "حذف",
      VENDOR_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "حفظ وخروج",
      SOFT_OPT_IN_ALERT_TITLE_TEXT: "Your consent preferences have been saved.",
      SOFT_OPT_IN_ALERT_BODY_TEXT: "To withdraw your consent or change your preferences, please click on the <strong>Privacy</strong>button.",
      CONSENT_LINK_LABEL: "إعدادات الخصوصية"
    },
    fa: {
      INIT_SCREEN_TITLE_TEXT: "ما به حریم خصوصی شما احترام می‌گذاریم",
      INIT_SCREEN_BODY_TEXT: {
        1: "ما و شرکایمان از فناوری کوکی برروی سایتمان استفاده می کنیم و به این ترتیب محتوا و تبلیغات متناسب شخصیت شما ارائه خواهد شد. برای اعلام موافقت خود در زیر کلیک می کنید. شما می‌توانید این تنظیمات را هر موقع که خواستید تغییر دهید.",
        2: "ما و شرکایمان داده‌های شخصی را با استفاده از فناوری کوکی بررسی می کنیم تا از آن برای تبلیغ، تحلیل ترافیک سایت و ارائه بهتر اطلاعات به شما استفاده کنیم. شما امکان تعیین اینکه چه کسی از داده های شما برای چه هدفی استفاده کند را خواهید داشت و می‌توانید این تنظیمات را در آینده تغییر دهید.",
        3: "کیفیت مطالبی که به شما ارائه می کنیم به درآمدی که از راه تبلیغات کسب می کنیم، بستگی خواهد شد. ما و شرکایمان از داده های شخصی شما برای ارائه تبلیغات متناسب با وضعیت شما و بررسی میزان فعالیت بر روی وبسایت و ارائه محتوای متناسب با حال شما استفاده خواهیم کرد. برای اعلام موافقت خود در زیر کلیک کنید. هر گاه خواستید می‌توانید در انتخاب خود تجدیدنظر کنید.",
        softOptIn: "We and our partners use technologies, such as cookies, and process personal data, such as IP addresses and cookie identifiers, to personalise ads and content based on your interests, measure the performance of ads and content, and derive insights about the audiences who saw ads and content. Continue using this website or click below to consent to the use of this technology and the processing of your personal data for these purposes. You can change your mind and change your consent choices at any time by returning to this site."
      },
      INIT_SCREEN_SETTINGS_BUTTON_TEXT: "Settings",
      INIT_SCREEN_REJECT_BUTTON_TEXT: "قبول نمی کنم",
      INIT_SCREEN_ACCEPT_BUTTON_TEXT: "قبول می کنم",
      INIT_SCREEN_PURPOSE_LINK_TEXT: "اهداف را نشان دهید",
      PURPOSE_SCREEN_TITLE_TEXT: "ما به حریم خصوصی شما احترام می‌گذاریم",
      PURPOSE_SCREEN_BODY_TEXT: "شما می‌توانید درجه رضایت خود را تنظیم و اعلام کنید. می توانید تعیین کنید چگونه می‌خواهید از داده های شما برای اهداف زیر استفاده شود. می توانید تنظیمات خود را به طور مستقل از شرکای ما اعلام کنید. برای هر هدف تعریفی ارائه شده است تا شما بدانید ما چگونه از داده های شما بهره می گیریم.",
      PURPOSE_SCREEN_VENDOR_LINK_TEXT: "دیدن فهرست کامل شرکاء",
      PURPOSE_SCREEN_CANCEL_BUTTON_TEXT: "لغو",
      PURPOSE_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "ثبت تنظیمات و خروج",
      VENDOR_SCREEN_TITLE_TEXT: "ما به حریم خصوصی شما احترام می‌گذاریم",
      VENDOR_SCREEN_BODY_TEXT: "می توانید ترجیحات خود در زمینه اعلام رضایت برای هر کدام از شرکت ها زیر اعلام کنید. فهرست هر کدام از شرکت ها را باز کنید تا ببینید برای چه هدفی آنها از داده های شما استفاده می کنند. در برخی موارد شرکت‌ها ممکن است استفاده از اطلاعات شما را براساس منافع مشروع خود و بدون کسب رضایت شما افشاء کنند. می‌توانید بر روی سیاست‌های آن‌ها در زمینه حریم خصوصی کلیک کنید تا به اطلاعات بیشتر دست یابید.",
      REJECT_ALL_BUTTON_TEXT: "هیچکدام از موارد را نمی‌پذیرم",
      ACCEPT_ALL_BUTTON_TEXT: "پذیرش کلیه موارد",
      VENDOR_SCREEN_PURPOSES_LINK_TEXT: "بازگشت به اهداف",
      VENDOR_SCREEN_CANCEL_BUTTON_TEXT: "لغو",
      VENDOR_SCREEN_SAVE_AND_EXIT_BUTTON_TEXT: "ثبت تنظیمات و خروج",
      SOFT_OPT_IN_ALERT_TITLE_TEXT: "Your consent preferences have been saved.",
      SOFT_OPT_IN_ALERT_BODY_TEXT: "To withdraw your consent or change your preferences, please click on the <strong>Privacy</strong>button.",
      CONSENT_LINK_LABEL: "تنظیمات حریم خصوصی"
    }
  };
  n.TRANSLATIONS = i
}, function(e, n, t) {
  "use strict";
  Object.defineProperty(n, "__esModule", {
    value: !0
  }), n.init = n.setAndSaveAllConsent = n.getConsentInfo = n.hideLogo = n.toggleVendorConsent = n.toggleAllVendorConsents = n.openTableDropdown = n.togglePartnerInfoVisibility = n.populateNonIabVendors = n.populateVendorList = n.togglePurposeVendorsVisibility = n.populatePurposes = n.toggleGoogleConsent = n.togglePublisherPurposeConsent = n.togglePurposeConsent = n.disableAllPurposeConsents = n.enableAllPurposeConsents = n.displayCustomLinks = n.displayNoConsentButton = n.dismissConsentUi = n.updateConsentUi = n.softOptInScrollListener = n.softOptInClickListener = n.addSoftOptListeners = n.removeSoftOptListeners = n.addQuantcastLogo = void 0;
  var o, i = u(t(10)),
    s = u(t(11)),
    a = t(0),
    r = t(1),
    l = t(3);

  function u(e) {
    return e && e.__esModule ? e : {
      default: e
    }
  }
  var c = 0,
    d = {},
    p = [],
    E = [],
    f = !1,
    T = [],
    _ = {},
    g = {},
    m = [],
    h = [],
    C = [],
    N = [];
  n.addQuantcastLogo = function() {
    var e = document.getElementById("qcLogo"),
      n = document.querySelector(".qc-cmp-link-text");
    (function(e) {
      var n = window.getComputedStyle(e)["background-color"].match(/\d{1,3}/g);
      return .3 * n[0] + .6 * n[1] + .1 * n[2]
    })(document.getElementById("qcCmpUi")) > 127 ? (e.src = i.default, e.classList.add("logo-black"), n.style.color = "rgb(0, 0, 0)") : (e.src = s.default, e.classList.add("logo-white"), n.style.color = "rgb(255, 255, 255)")
  };
  var v = function(e) {
      return e.replace(/{{(.*?)}}/g, function(e, n, t, i) {
        return o[n.trim()]
      })
    },
    O = function(e, n) {
      var t = "";
      return n ? t = v(e) : function() {
        var n = document.createElement("div");
        n.innerHTML = v(e), t = function(e) {
          return e.querySelectorAll('[data-new-user="remove"]').forEach(function(e) {
            e.parentNode.removeChild(e)
          }), e
        }(n).innerHTML
      }(), t
    },
    I = !1,
    S = function() {
      I = !0
    },
    y = function() {
      document.removeEventListener("mousedown", A), document.removeEventListener("ontouchstart", A), document.removeEventListener("scroll", k), window.removeEventListener("orientationchange", S)
    };
  n.removeSoftOptListeners = y;
  var L = function() {
    document.addEventListener("mousedown", A), document.addEventListener("ontouchstart", A), document.addEventListener("scroll", k), window.addEventListener("orientationchange", S)
  };
  n.addSoftOptListeners = L;
  var b = function() {
      y(), window.__cmpui("updateConsentUi", 4), document.getElementById("qcCmpUi").classList.remove("qc-cmp-ui"), setTimeout(function() {
        window.__cmpui("setAndSaveAllConsent", !0)
      }, 2e3)
    },
    A = function(e) {
      document.getElementById("qcCmpUi") && (!document.getElementById("qcCmpUi").contains(e.target) && "qcChangeConsent" !== e.target.id && !document.body.classList.contains("qc-cmp-ui-showing") && b())
    };
  n.softOptInClickListener = A;
  var k = function() {
    (document.documentElement && document.documentElement.scrollTop || document.body.scrollTop) > 50 && !document.body.classList.contains("qc-cmp-ui-showing") && 0 === function() {
      var e = 0;
      window.screen.orientation ? "number" == typeof window.screen.orientation.angle && (e = window.screen.orientation.angle) : "number" == typeof window.orientation && (e = window.orientation);
      return e
    }() && !I ? (b(), I = !1) : I = !1
  };
  n.softOptInScrollListener = k;
  var P = function() {
      document.getElementsByClassName("qc-cmp-ui-container")[0].classList.remove("softOptIn"), document.getElementById("qcCmpUi").classList.remove("softOptIn"), document.body.classList.add("qc-cmp-ui-showing")
    },
    R = function(e, n, t) {
      var i = document.getElementById("qcCmpUi");
      window.__cmpui("track", "pgChng", c + ">" + n), c = n, o.softOptInEnabled && (1 !== n ? (y(), P()) : 1 === n && (L(), document.body.classList.remove("qc-cmp-ui-showing"), document.getElementsByClassName("qc-cmp-ui-container")[0].classList.add("softOptIn"), document.getElementById("qcCmpUi").classList.add("softOptIn"))), i.innerHTML = O(e[n].html, t), e[n].init && e[n].init()
    };
  n.updateConsentUi = R;
  var V = function(e, n, t) {
      if ((0, l.generateSessionId)("GDPR-"), c = n, o.softOptInEnabled && 1 === n && L(), document.getElementById("qcCmpUi")) R(e, n, t);
      else {
        var i = document.createElement("div");
        i.className = "qc-cmp-ui-container", o.softOptInEnabled && i.classList.add("softOptIn");
        var s = document.createElement("div");
        s.className = "qc-cmp-ui", o.softOptInEnabled && s.classList.add("softOptIn"), s.id = "qcCmpUi", s.innerHTML = O(e[n].html, t), i.appendChild(s), document.body.insertBefore(i, document.body.childNodes[0]), e[n].init && e[n].init(), setTimeout(function() {
          t ? (window.__cmpui("track", "displayConsentUi:byChoice"), window.__cmpui("logTracking", o)) : (window.__cmpui("track", "displayConsentUi:mandatory"), window.__cmpui("logTracking", o)), o.softOptInEnabled || document.body.classList.add("qc-cmp-ui-showing"), i.classList.add("qc-cmp-showing"), s.classList.add("qc-cmp-showing")
        }, 250)
      }
      o.softOptInEnabled & 1 !== n && P()
    },
    B = function() {
      window.__cmpui("logTracking", o), o.rejectConsentRedirectUrl && (0, a.isArrayAllFalse)(h) && (0, a.isObjectAllFalse)(_) && (0, a.isObjectAllFalse)(g) && !f && (window.location.href = o.rejectConsentRedirectUrl);
      var e = document.getElementsByClassName("qc-cmp-ui-container")[0];
      e && (e.classList.remove("qc-cmp-showing"), e.childNodes[0].classList.remove("qc-cmp-showing"), setTimeout(function() {
        e.outerHTML = "", document.body.classList.remove("qc-cmp-ui-showing"), (0, a.displayPersistentConsentLink)(o)
      }, 250)), window.__cmp("runConsentUiCallback", {
        reason: "ui-closed",
        uiShown: !0
      }), o.softOptInEnabled && y()
    };
  n.dismissConsentUi = B;
  n.displayNoConsentButton = function() {
    var e = document.getElementById("qcCmpButtons"),
      n = document.createElement("button");
    n.className = "qc-cmp-button qc-cmp-secondary-button", o.initScreenRejectButtonShowing ? (n.onclick = function() {
      window.__cmpui("setAndSaveAllConsent", !1)
    }, n.innerText = o.initScreenRejectButton) : (n.onclick = function() {
      window.__cmpui("updateConsentUi", 2)
    }, n.innerText = o.initScreenSettingsButton), e.insertBefore(n, e.firstChild)
  };
  n.displayCustomLinks = function() {
    if (o.initScreenCustomLinks) {
      var e = o.initScreenCustomLinks,
        n = document.getElementsByClassName("qc-cmp-alt-buttons")[0];
      e.forEach(function(e) {
        var t = document.createElement("a"),
          o = e.match(r.MARKDOWN_LINK_REGEX);
        t.innerText = o[1], t.target = "_blank", t.setAttribute("href", o[2]), t.className = "qc-cmp-alt-action qc-cmp-center-bottom", n.insertBefore(t, null)
      })
    }
  };
  var U = function(e) {
      return !0 === e ? "on" : !1 === e ? "off" : o.defaultToggleValue
    },
    D = function(e, n) {
      var t = document.createElement("span");
      return t.className = n ? "qc-cmp-toggle qc-cmp-toggle-" + U(e) + " isNonIab" : "qc-cmp-toggle qc-cmp-toggle-" + U(e), t.innerHTML = '<span class="qc-cmp-toggle-switch"></span>', t
    };
  n.enableAllPurposeConsents = function() {
    window.__cmpui("track", "allPurpsOn");
    for (var e = 0; e < p.length; e++) E[e] || o.publisherPurposeLegitimateInterestIds.includes(p[e].id) || z(e);
    for (e = 0; e < m.length; e++) h[e] || (h[e] = !0, M(e));
    f || X(0), Object.keys(_).forEach(function(e) {
      _[e] = !0
    })
  };
  n.disableAllPurposeConsents = function() {
    window.__cmpui("track", "allPurpsOff");
    for (var e = 0; e < p.length; e++) E[e] && !o.publisherPurposeLegitimateInterestIds.includes(p[e].id) && z(e);
    for (e = 0; e < m.length; e++) h[e] && w(e);
    f && X(0)
  };
  var w = function(e, n) {
    n && n.stopPropagation(), h[e] = !h[e], M(e), K(e)
  };
  n.togglePurposeConsent = w;
  var z = function(e) {
    E[e] = !E[e];
    var n = document.getElementsByClassName("qc-cmp-publisher-purposes-toggler")[e];
    j(n, E[e])
  };
  n.togglePublisherPurposeConsent = z;
  var X = function(e) {
    var n = document.getElementsByClassName("qc-cmp-google-purposes-toggler")[e];
    j(n, f = !f)
  };
  n.toggleGoogleConsent = X;
  var j = function(e, n) {
      var t = e.childNodes[0],
        i = e.childNodes[1];
      t.classList.toggle("qc-cmp-toggle-on"), t.classList.toggle("qc-cmp-toggle-off"), i.innerText = n ? o.onLabel : o.offLabel
    },
    K = function(e) {
      for (var n = m[e].vendors, t = 0; t < n.length; t++) {
        var o = T[n[t].index].purposeIds,
          i = _[n[t].id];
        if (h[e]) i = !0;
        else if (i) {
          i = !1;
          for (var s = 0; s < o.length; s++)
            if (h[o[s] - 1]) {
              i = !0;
              break
            }
        }
        _[n[t].id] = i
      }
    },
    M = function(e) {
      var n = document.getElementsByClassName("qc-cmp-vendors-purposes-toggler")[e];
      j(n, h[e]);
      for (var t = document.getElementsByClassName("qc-cmp-purposes-vendor-list")[e].getElementsByClassName("qc-cmp-enabled-cell"), i = 0; i < t.length; i++) t[i].innerHTML = h[e] ? o.onLabel : o.offLabel
    },
    F = function(e, n) {
      var t = document.createElement("td");
      t.innerHTML = '<h5 class="qc-cmp-table-header">' + o.companyLabel + "</h5>";
      var i = document.createElement("td"),
        s = document.createElement("tr");
      s.className = "qc-cmp-vendor-row-header", s.appendChild(t), s.appendChild(i);
      var a = document.createElement("thead");
      a.appendChild(s);
      var r = document.createElement("tbody"),
        l = m[e];
      if (n) !o.googlePersonalization && "googlePersonalization" in o || window.__cmp("getGoogleVendorList", function(e, n) {
        if (n)
          for (var t = 0; t < e.length; t++) {
            var i = e[t],
              s = document.createElement("tr"),
              a = document.createElement("td"),
              l = document.createElement("td");
            if (a.className = "qc-cmp-company-cell", a.innerText = i.provider_name, l.className = "qc-cmp-enabled-cell", s.className = "qc-cmp-table-row qc-cmp-vendor-row", i.policy_url) {
              var u = document.createElement("a");
              u.setAttribute("href", i.policy_url), u.setAttribute("target", "_blank"), u.className = "qc-cmp-alt-action qc-cmp-show-google-vendors-link", u.innerText = o.privacyPolicyLabel.replace(":", ""), l.appendChild(u)
            }
            s.appendChild(a), s.appendChild(l), r.appendChild(s)
          } else console.error("unable to get google vendors list. Continuing")
      });
      else
        for (var u = 0; u < l.vendors.length; u++) {
          (c = document.createElement("td")).className = "qc-cmp-company-cell", c.innerText = l.vendors[u].name, (p = document.createElement("td")).className = "qc-cmp-enabled-cell", p.innerText = h[e] && _[l.vendors[u].id] ? o.onLabel : o.offLabel, (d = document.createElement("tr")).className = "qc-cmp-table-row qc-cmp-vendor-row", d.appendChild(c), d.appendChild(p), r.appendChild(d)
        }
      if (!l.vendors.length) {
        var c;
        (c = document.createElement("td")).className = "qc-cmp-company-cell", c.innerText = "No vendors are requesting this purpose";
        var d, p = document.createElement("td");
        (d = document.createElement("tr")).className = "qc-cmp-vendor-row", d.appendChild(c), d.appendChild(p), r.appendChild(d)
      }
      var E = document.createElement("table");
      return E.className = n ? "qc-cmp-table qc-cmp-purposes-vendor-list qc-cmp-google-vendor-list qc-cmp-hidden" : "qc-cmp-table qc-cmp-purposes-vendor-list qc-cmp-hidden", E.appendChild(a), E.appendChild(r), E
    },
    G = function(e) {
      var n = document.createElement("table");
      n.className = "qc-cmp-table qc-cmp-" + e.className + "-table";
      var t = document.createElement("thead");
      t.innerHTML = '<tr><td class="qc-cmp-table-header">' + e.title + "</td></tr>", n.appendChild(t);
      for (var i = document.createElement("tbody"), s = e.publisherPurposeLegitimateInterestIds, a = "google-purposes" === e.className, r = "features-purposes" === e.className, l = 0; l < e.purposes.length; l++) {
        var u = e.purposes[l],
          c = document.createElement("h4");
        c.className = "qc-cmp-bold-messaging", c.innerText = u.name;
        var d = document.createElement("p");
        if (d.className = "qc-cmp-purpose-description", d.innerText = u.description, !r) {
          var p = document.createElement("p");
          p.className = "qc-cmp-toggle-status", p.innerText = e.purposeConsents[l] ? o.onLabel : o.offLabel;
          var E = document.createElement("div"),
            f = document.createElement("div");
          if (s && s.includes(u.id)) p.innerText = o.requiredLabel;
          else {
            var T = D(e.purposeConsents[l]);
            T.onclick = e.toggleClickFunc(l), E.appendChild(T)
          }
          E.className = "qc-cmp-toggler qc-cmp-" + e.className + "-toggler", f.className = "qc-cmp-purpose-actions", E.appendChild(p), f.appendChild(E)
        }(u = document.createElement("div")).className = "qc-cmp-purpose-info", u.appendChild(c), u.appendChild(d), r || u.appendChild(f);
        var _ = document.createElement("td");
        if (_.className = "qc-cmp-table-row", _.appendChild(u), e.hasShowVendorListLink) {
          var g = document.createElement("a");
          g.className = a ? "qc-cmp-alt-action qc-cmp-show-google-vendors-link" : "qc-cmp-alt-action qc-cmp-show-vendors-link", g.onclick = a ? function(e) {
            return function() {
              window.__cmpui("togglePurposeVendorsVisibility", e, !0)
            }
          }(l) : function(e) {
            return function() {
              window.__cmpui("togglePurposeVendorsVisibility", e)
            }
          }(l), g.innerText = o.viewCompaniesLabel, f.insertBefore(g, E);
          var m = a ? F(l, !0) : F(l);
          _.appendChild(m)
        }
        var h = document.createElement("tr");
        h.appendChild(_), i.appendChild(h)
      }
      return n.appendChild(i), n
    };
  n.populatePurposes = function() {
    var e = document.getElementById("qcCmpPurposesContainer"),
      n = {
        title: o.publisherName,
        className: "publisher-purposes",
        purposes: p,
        publisherPurposeLegitimateInterestIds: o.publisherPurposeLegitimateInterestIds,
        purposeConsents: E,
        hasShowVendorListLink: !1,
        toggleClickFunc: function(e) {
          return function() {
            window.__cmpui("togglePublisherPurposeConsent", e)
          }
        }
      };
    o.publisherPurposeIds.length > 0 && e.appendChild(G(n));
    var t = {
      title: o.thirdPartyVendorsLabel,
      className: "vendors-purposes",
      purposes: m,
      purposeConsents: h,
      hasShowVendorListLink: !0,
      toggleClickFunc: function(e) {
        return function() {
          window.__cmpui("togglePurposeConsent", e)
        }
      }
    };
    e.appendChild(G(t));
    var i = [{
        id: 1,
        name: "Google",
        description: o.googlePurposesText
      }],
      s = {
        title: o.otherLabel,
        className: "google-purposes",
        purposes: i,
        purposeConsents: [f],
        hasShowVendorListLink: !0,
        toggleClickFunc: function(e) {
          return function() {
            window.__cmpui("toggleGoogleConsent", e)
          }
        }
      };
    !o.googlePersonalization && "googlePersonalization" in o || e.appendChild(G(s));
    var a = {
      title: o.featuresLabel,
      className: "features-purposes",
      purposes: C
    };
    e.appendChild(G(a))
  };
  n.togglePurposeVendorsVisibility = function(e, n) {
    var t = n ? document.getElementsByClassName("qc-cmp-google-vendor-list")[e] : document.getElementsByClassName("qc-cmp-purposes-vendor-list")[e];
    t.classList.toggle("qc-cmp-hidden");
    var i = -1 === t.className.indexOf("qc-cmp-hidden");
    (n ? document.getElementsByClassName("qc-cmp-show-google-vendors-link")[e] : document.getElementsByClassName("qc-cmp-show-vendors-link")[e]).innerText = i ? o.hideCompaniesLabel : o.viewCompaniesLabel
  };
  var q = function(e, n, t) {
      var o = document.createElement("td");
      o.className = "qc-cmp-company-cell", o.innerText = e.name;
      var i = t ? D(g[e.vendorId], t) : D(_[e.id]);
      i.onclick = t ? function() {
        window.__cmpui("toggleVendorConsent", n, e.vendorId, t)
      } : function() {
        window.__cmpui("toggleVendorConsent", n, e.id)
      };
      var s = document.createElement("td");
      s.className = "qc-cmp-toggle-cell", s.appendChild(i);
      var a = document.createElement("div");
      a.className = "qc-cmp-arrow-down " + n, a.onclick = t ? function() {
        window.__cmpui("openTableDropdown", n, !0)
      } : function() {
        window.__cmpui("openTableDropdown", n)
      };
      var r = document.createElement("td");
      r.className = "qc-cmp-dropdown-cell", r.appendChild(a), !t || e.description || e.privacyPolicyUrl || a.classList.add("qc-cmp-hidden");
      var l = document.createElement("tr");
      return l.className = "qc-cmp-table-row qc-cmp-vendor-row", l.appendChild(o), s && l.appendChild(s), l.appendChild(r), l
    },
    Y = function(e) {
      if (!e.itemIds.length) return null;
      var n = document.createElement("ul");
      n.className = "qc-cmp-vendor-info-list";
      for (var t = 0; t < e.itemIds.length; t++) {
        var o = document.createElement("li");
        o.innerText = e.items[e.itemIds[t] - 1].name, n.appendChild(o)
      }
      var i = document.createElement("section");
      return i.className = "qc-cmp-vendor-info-section", i.innerHTML = '<h4 class="qc-cmp-vendor-info-list-title">' + e.title + ":</h4>", i.appendChild(n), i
    },
    x = function(e, n) {
      var t = e.policyUrl || e.privacyPolicyUrl;
      if (t) {
        var i = document.createElement("a");
        i.target = "_blank", i.className = "qc-cmp-alt-action", i.href = t, i.innerText = t.replace(/(^\w+:|^)\/\//, "");
        var s = document.createElement("div");
        s.className = "qc-cmp-vendor-policy", s.innerHTML = '<span class="qc-cmp-bold">' + o.privacyPolicyLabel + "</span>", s.appendChild(i)
      }
      if (e.description) {
        var a = document.createElement("p");
        a.className = "qc-cmp-vendor-description-el", a.innerText = e.description;
        var r = document.createElement("div");
        t && (r.className = "qc-cmp-vendor-description"), r.innerHTML = '<span class="qc-cmp-bold">' + o.descriptionLabel + "</span>", r.appendChild(a)
      }
      if (!n) var l = Y({
          title: o.purposesLabel,
          itemIds: e.purposeIds,
          items: m
        }),
        u = Y({
          title: o.legitimateInterestPurposesLabel,
          itemIds: e.legIntPurposeIds,
          items: m
        }),
        c = Y({
          title: o.featuresLabel,
          itemIds: e.featureIds,
          items: C
        });
      var d = document.createElement("td");
      d.className = "qc-cmp-vendor-info-content", d.setAttribute("colspan", "3"), s && d.appendChild(s), r && d.appendChild(r), l && d.appendChild(l), u && d.appendChild(u), c && d.appendChild(c);
      var p = document.createElement("tr");
      return p.className = "qc-cmp-vendor-info qc-cmp-hidden", p.appendChild(d), p
    };
  n.populateVendorList = function() {
    var e = document.createElement("tbody");
    e.id = "qcCmpVendorListBody", e.className = "qc-cmp-vendor-list-body", T.forEach(function(n, t) {
      e.appendChild(q(n, t)), e.appendChild(x(n))
    }), document.getElementById("qcCmpVendorList").appendChild(e)
  };
  n.populateNonIabVendors = function() {
    var e = document.getElementById("qcCmpNonIab"),
      n = document.createElement("tbody");
    n.id = "qcCmpNonIabVendorsBody", N.length ? (N.forEach(function(e, t) {
      n.appendChild(q(e, t, !0)), n.appendChild(x(e, !0))
    }), e.appendChild(n)) : e.classList.add("qc-hide-table")
  };
  n.togglePartnerInfoVisibility = function() {
    document.getElementById("qcCmpPartnerInfo").classList.toggle("qc-cmp-hidden")
  };
  n.openTableDropdown = function(e, n) {
    var t = n ? document.getElementById("qcCmpNonIab") : document.getElementById("qcCmpVendorListBody");
    t.getElementsByClassName("qc-cmp-arrow-down " + e)[0].classList.toggle("qc-cmp-flip-up"), t.getElementsByClassName("qc-cmp-vendor-info")[e].classList.toggle("qc-cmp-hidden")
  };
  n.toggleAllVendorConsents = function(e) {
    window.__cmpui("track", "allVends" + (e ? "On" : "Off"));
    for (var n = document.getElementsByClassName("qc-cmp-toggle"), t = document.getElementsByClassName("isNonIab"), o = "qc-cmp-toggle-" + (e ? "off" : "on"), i = 0; i < n.length; i++) n[i].classList.contains(o) && T[i] && H(i, T[i].id);
    for (var s = 0; s < t.length; s++) t[s].classList.contains(o) && H(s, N[s].vendorId, !0)
  };
  var H = function(e, n, t) {
    t ? g[n] = !g[n] : (_[n] = !_[n], W(e)), J(e, t)
  };
  n.toggleVendorConsent = H;
  var W = function(e) {
      for (var n = T[e].purposeIds, t = 0; t < n.length; t++) {
        var o = n[t] - 1,
          i = m[o].vendors,
          s = h[o];
        if (_[T[e].id]) s = !0;
        else if (s) {
          s = !1;
          for (var a = 0; a < i.length; a++)
            if (_[i[a].id]) {
              s = !0;
              break
            }
        }
        h[o] = s
      }
    },
    J = function(e, n) {
      var t = n ? document.getElementsByClassName("isNonIab")[e] : document.getElementsByClassName("qc-cmp-toggle")[e];
      t.classList.toggle("qc-cmp-toggle-on"), t.classList.toggle("qc-cmp-toggle-off")
    };
  n.hideLogo = function(e) {
    e && e.currentTarget && (e.currentTarget.className += " qc-cmp-hidden");
    var n = document.getElementById("qcCmpNavPublisherLogo");
    n && (n.className += " qc-cmp-no-height")
  };
  var Z = function() {
    return {
      publisherPurposeConsents: E,
      publisherPurposes: p,
      purposeConsents: h,
      googlePurposeConsents: f,
      vendorConsents: _,
      nonIabVendorConsents: g,
      vendorList: d,
      nonIabVendorList: N,
      consentPage: c
    }
  };
  n.getConsentInfo = Z;
  n.setAndSaveAllConsent = function(e) {
    for (var n in window.__cmpui("track", "setAllConsent", e), _) _[n] = e;
    for (var n in g) g[n] = e;
    h.fill(e), E.fill(e), f = e, window.__cmp("saveConsents", Z(), B, e)
  };
  var Q = function(e) {
    return !0 === e || !1 !== e && (void 0 === e ? "on" === o.defaultToggleValue : void 0)
  };
  n.init = function(e, n, t) {
    var i = "on" === (o = window.__cmp("getConfig", "internal")).defaultToggleValue;
    f = i, !o.googlePersonalization && "googlePersonalization" in o || window.__cmp("getGooglePersonalization", function(e, n) {
      if (n) {
        var t = 0 !== e.googlePersonalizationData.consentValue;
        f = t
      }
    }), window.__cmp("getVendorList", "LATEST", function(s, r) {
      if (r) {
        var l = (0, a.filterVendorsByDeletedFlag)(s.vendors);
        (d = s).vendors = l, m = d.purposes, C = d.features, window.__cmp("fetchPurposeList", o.language, function(s, a) {
          a && s && (s.purposes && s.purposes.length > 0 && (m = s.purposes), s.features && s.features.length > 0 && (C = s.features)), h = Array(m.length).fill(i), p = function() {
            for (var e = [], n = 0; n < o.publisherPurposeIds.length; n++) {
              var t = m.find(function(e) {
                return e.id === o.publisherPurposeIds[n]
              });
              t && e.push(t)
            }
            return e
          }(), E = Array(p.length).fill(i), T = d.vendors;
          for (var r = 0; r < T.length; r++) _[T[r].id] = i;
          window.__cmp("getCurrentPublisherConsents", null, function(o, i) {
            if (i) {
              if (o.standardPurposeConsents)
                for (var s = 0; s < p.length; s++) E[s] = Q(o.standardPurposeConsents[p[s].id])
            } else console.error("Unable to get current publisher consents. Continuing");
            window.__cmp("getCurrentVendorConsents", null, function(o, i) {
              if (i) {
                for (var s in o.purposeConsents) h[s - 1] = o.purposeConsents[s];
                for (var a in o.vendorConsents) _[a] = o.vendorConsents[a]
              } else console.error("Unable to get current vendor consents. Resetting UI to initial state...");
              ! function() {
                for (var e = 0; e < m.length; e++) {
                  for (var n = m[e], t = [], o = 0; o < T.length; o++) {
                    var i = T[o];
                    i.purposeIds.indexOf(n.id) >= 0 && (i.index = o, t.push(i))
                  }
                  n.vendors = t
                }
              }(), V(e, n || 1, t)
            })
          })
        })
      } else console.error("Unable to get latest vendor list. Aborting UI display...")
    }), window.__cmp("getNonIabVendorList", function(e, n) {
      if (n) {
        N = e;
        for (var t = 0; t < N.length; t++) g[N[t].vendorId] = i;
        window.__cmp("getNonIABVendorConsents", null, function(e, n) {
          if (n)
            for (var t in e.nonIABVendorConsents) g[t] = e.nonIABVendorConsents[t];
          else console.warn("unable to get the NonIab vendor consents")
        })
      } else console.warn("Unable to get NonIab Vendor list.")
    })
  }
}, function(e, n, t) {
  "use strict";
  Object.defineProperty(n, "__esModule", {
    value: !0
  }), n.default = n.cmpPurposeList = void 0;
  var o = t(0),
    i = t(7),
    s = {
      cachedPurposeList: {},
      purposeListCallbacks: {},
      purposeListResponseHandler: function(e, n, t) {
        try {
          if (4 === e.readyState) {
            if (200 !== e.status) throw "could fetch the purpose list for language: " + n;
            var i;
            i = e.response ? "string" == typeof e.response ? JSON.parse(e.response) : e.response : JSON.parse(e.responseText), (0, o.doCallback)(t, i, !0)
          }
        } catch (e) {
          (0, o.doCallback)(t, null, !1)
        }
      },
      fetchPurposeList: function(e, n) {
        if (i.IAB_SUPPORTED_LANGUAGES.includes(e))
          if (s.cachedPurposeList[e])(0, o.doCallback)(n, s.cachedPurposeList[e], !0);
          else if (s.purposeListCallbacks[e] && s.purposeListCallbacks[e].size() > 0) s.purposeListCallbacks[e].push(n);
        else {
          s.purposeListCallbacks[e] = new o.CallbackArray, s.purposeListCallbacks[e].push(n);
          var t = (new Date).getTime(),
            a = "https://vendorlist.consensu.org/purposes-{language}.json".replace("{language}", e.toLowerCase()).concat("?timestamp=", t);
          (0, o.getJson)({
            url: a
          }, function(n) {
            s.purposeListResponseHandler(n, e, function(n, t) {
              t && (s.cachedPurposeList[e] = n), s.purposeListCallbacks[e].call(n, t)
            })
          })
        } else(0, o.doCallback)(n, {
          error: "Does not support the requested Language: " + e
        }, !1)
      },
      setPurposeList: function(e, n) {
        s.cachedPurposeList[e] = n
      }
    };
  n.cmpPurposeList = s;
  var a = s;
  n.default = a
}, function(e, n) {
  e.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAAAgCAYAAACclNOPAAAABGdBTUEAALGPC/xhBQAADHBJREFUeAHtmgmwllUZgBEJN0RFc0eQFB1XMgQVkJuOW1qjWbllc0tHrWk0oVyy1MoMMsW1RctmHNOMtFIzDUx0chfRcmdzRdyRcAvEnuf6H+bwcr7//+/l6jjd+8489zvnPe853/ne8573nHthxR4dlxU73rW7Z7cHyh5YoaxeRrsamuEwEraFDUDdQpgHs+AeuBVmQrd0e+AD8UBfRh0LD8N7TTAfm4kwArql2wOd6oEWRnsQmgnEaPMO/SaAWbSrS08c0KeA+q4ky+WHVjz1BsRAa299MmOsC11ZNuXjH4XZGTMobwFdSQbysSU/bNnICV/EwLthveBbRPsCeKuBnWPcAqtDVxUD778Q/bldF3PI4Ao/bJ/7IR4bW9H4S+iVG2Vlf2k5CnYEf7kZAnvDefASlKQF5bhSQxfRGYhu4Fysq+9K0m4/+GecGyDuZOtvwjFQ7089m9F+E5T6uwC7Q1cUM4P+y/3iCeSG7kqyOR9b8kPlSbEXHRZD7jjLOu9QaEa8vE+BOIZ19fUCmuZOF3+p2hAGwSawFjT7py5MK8VxHW8grAn1ZGMaSwvhBm5WfJ/j+B3rQ2/oiKxKJ/9kl/yxNuV4SjYzruNsVBvHefnXmEaifckPBuoSyY/mo9GWFutS9Fcs6VG/4L3Sce6CuFAj0Q2DO0GHngg6JJdfUfHiG+WrKJa6a1C/HiZHQ+rrgffgz8CW4DxWBjeW83sWboera08eS4lzjBtQ+4kwGMaA2d73uJivwTS4ACZBklEU3OT94GNJWXva7wR4EV6Ci2AR5KKP9oeDYAjoK3VvwFzQj5fDbVBP3IQHwn6wNTifVcD36Y85cC/oj5vB5FESv+EA+BK4Fs5Hv3o/fh2egBvhSnDMJI388B0M9cPLoA/bxOjVsTGz+XfF9uzktsH4cX5hLMc+q2ZgJn2+YKPTSnItyji37xcMD0P3VME29rX+LvwOPg65HEkl2l+IbjQYCLEt1V3gMZDkFAqprd7zSexWSp1qTwNnCtTrZ5vfcAmsDiXRn49Do3FSu34eUBhoELqbmxznGezyDd2sH56mnxuuTdyJaVL50wl2RHamkwuUj2X5bjA7mPJnQWzfB11JJqKMticFw6OoLy7YxX6xfit93CBJWilEG7OQuz7qY91sMRwUM2BsL9UfwS4PSO9ULk7Jtkp3HfZmvVzMim9DVZ8q/YP0MfsnccP+C6rsS3rX/uDaAM364THsexscikdCSVysjshDdHqu0HEQOlO9gdOZshWDnQ0rhEENkKkwCR4AM0qUXVEcHZWhPoq6d69G4rGWxrLcjOSB5F3sMujfTMfMxkz47ay+MWWzeh7oNvv9+kF/6Jd3IIobwmM0yVgK26ZK7alf7wPHcUNF8XeFn8HqkGIs2sR67ocev6W1FOn7xl7tqN9WGHMhOoPH1NyZGfKCwrvc1cMgOaQX5RaYAfFb70KX7FoL7cn+Ktr2gJ3gh1DKQI+i9/s+DeeAvvW70xg+DYzL4Gw4EZybUpVNPHZPBYP9YngT8vEsew9Lme2UQvtsdM4pvcvvHQoGaBxrOjrvh2I5b3+Wuhs0+UubVijN6TD0I0A/XAoLIR8r98NJtBnIbfInfuaGqexgHZU/0zGNkz91gtmjswLSxZ9ZeFcLupLsj3Ix5HPSyWYnpRXytlS+wsYg51FP7en5MroUGJr3h7hYLsxmNmbiNcZjK42Tnv9Gt35mZ/EIcDGTTXoeaiPiBku69DyorWXZH66xGS/Z+fSXFE8E574A8rbrqZckXav0rXNzzAszQ7N2yQ+bZzZLdosvLEk8Aks2Vbq0g6raO0vve86FPtmAfriLUpI7UM6HNbJGd2a9I9ajbVxmn4rXUDg2VWpPj0mzRpKljqKk5Bn1Q9ANztpT8QwKc1Ol9ryc52lgwOQykoobx2z0l6xhEeWbsnpevJfKHBiQKV13fZICMWvq0ULlZPA9T0OKneMoT4CUBQ3IeZAkfm9R36umfTW1hqf3vY6IH1Tq62TdccsT6HE+Hpse2VXSmwYDxEDRKQOhvaLjHy90Mhv6TTGYO/J9OzBO7Oe6TIEobpBjIGbOmTXDi2OHrO5c9UeiH+UUVJlZ25H8Aoq5kGfz1aifCSeAPjGDez0ysKfBW9BhSQHp8VmSbVDmO61kU9KtiXLTQoMO9iPdfR+EGHQ7w2jwIu4x0Rc8DsVF0MYgbY+YUd3xUUoZJNo0Wx9UMHwO3SsFvaobKvS5Wj8PA/1hBjajujbJH25QfVHyR0/0Br5H8ckQxXGG10htz1CYBL+A+5KyPc8UkPdXdNoN/Y8r2uqp3e1x92o/HeaBDuls2Z8BT4GhnT3whzSev5FG8S7ncdsR2Z1OPwA3qMHVUTmLjqPA60AjMeC/BofA6fBTaJekiU6l14uFnrug266gb6RqxSAeP/a5GUrHg231pFGfb9D5amgUjB7vbggv3h81afSN7ZnvFzC+HkZAWuNSfzOg/qgX9K/R/jk4Fyw3I2be8XBwM8a5TcqQL6G8Eb6SN1L2iDsV/MAopnl3gLsiF+8oe+aKWtkj75qCPldVLYofWCWb0TAOouM9PrxueMd5AfzGV8Ej+xZYCz5KYjaM4hz158LYUKe+Lm3ng2uXiwlHfzwAz0Pyh3e+v4N+rBID8XiYAK5tC2wPm0BfqBL7/BHqBfxSfVNAqvw5mGp1QC4HUhkLZ+dKygbYbDgu6Kuqf6PBy289Kd1lnGPpPprG2ZtCPO5movPIeioZZc91KH8UM+SMbI6pOIDCxqCfo+yDYmhQTqHeDzYIeoNRfzwU9FZXhGb98TS2v65hnPieLWA3aIV4TRuMzg0yB5qSPCDvpsfv4fBCTzOhC+nT3ZLkPAoHwOikqHi6C3+Utb1HueSEIeivzewsjgI/ukoGFhruQFcKRk3d1TGA1X/Y8m544b3U1RkgSfpQ8Nj7SVLUnq7bWbB10JtQ1g46q2bFUjDaZsCvZyHI29T3hRPA9UriON8Es7YBKpPAE3Yy5DFleSWoJ0v5oWewPJn6k0FnVbuT4B4YDwah95PdYDo0Eh06NTPyY1/O6ql4JIVtUoWnDr8Q8o/MmtuKOibKVijikaXNRmCmL2Vi2z8sMegGhJd5tZgWdFYNCAMjyaoUzoAYjCaKm6B0d/8E+rUgitl0AqwRG2p112lXMOEkXKNhEMXAi++eh85rUpWU/LCMrRNwIHfF8mL0XwbxGoCq8n8EvUKbWfKvoJOr5uAGUQ6Hks0/0LdCC3wWzgSzZsn2efQps7QWbO5DF52Nqu2fQd8J9v+hPhCS9KfwOsT3eq+9EX4DaYMcVrCzn5tuCkyEhyGOZf0iUPaEUrsn4FFgEtkHToPHoGQ7H70nyWowq2AzB913YQ/wyvQ9UBfHcu2TmAxKfngRvX64FEpxgvr9F5VeEF/YqG5geySUZChK76GNxrBdB0W7FJAeNwZUbK+qL8LWoMnbP8iAXIV3zQjvy989kzazi2LG8NqUtzdTdqMlP/eh/Eg7x4j+tT4QFIO4mTlEG4NvWweoiX54AqJdqs+mbcn/9qn1WfKYRMmd5C8iyyMeBcdUDGDWGVfRlqvNdJfkilo5ZawXqH8LzCKNxGA8HqYFw55ZPY2bqYrZMbXnfdXFuvfnen9dMMMmeZfC0VDPPtmmp5vpUHi2pljA81jw2YycjtEtwTD/Bn0/PrQ3qhqMR4DXkCTt8UPqs8zTiX0evJv4gSmaq546NLY5uS2gJC7+WNCpsZ9137sujIE3AvbLZT8q90NpHHXef9NdbDLlfDyPpX6gfBnyNsv/hFKgbonea0Vu7wYZALmsScUgK81tNvqVcmPKveDr8DCU+qjznX8A51CSXVHeAVX9H6TtkFpHx8m/YS71AbW29DAObod6p5pr7bXik1CSen54ig69S04uDaRuMHiZ3Rr6g0eDWck733S4G3aEcyDKVSgOjsqsviHl0bAN9AU/7E4wIM1qfojkYiBol8vKVHYB5+GYbhAzh8EoOlPZAPIg0O45WAx+1zqQi/28wkTxzuN7cj8aAI7lvHNxc48Efej7e8N88Hi9Enx3lFVRfAp2gI3Aun1mgMHmHbCeGNg7ge90zZyn3zEV7G/WUtaDVdpK7/+o+gavFB7DzmlT8ARMMfAEZcd1c9cT/TACnJO+i35A1Xni4C68HxTZq/Ne0z3S/6sHjPjOFDPNbBgOZrBXa1juB9dBKROg7pZuDyx91HSmPzw682PMsU3Vb4KZs1u6PVD0wP8ARf3Y76F3EOQAAAAASUVORK5CYII="
}, function(e, n) {
  e.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAAAgCAYAAACclNOPAAAABGdBTUEAALGPC/xhBQAADaZJREFUeAHtnAmslcUVx8EF1Kq4iwsIBhQVRat1qQs2UlQ0Ki7Rti6AtlpjjKlaSVWSVq1tTLoo1boUME1asS5VSy0uiLi1KpsRxQ1wBcECoijK1t/vvjs3c+fOd999T6zLe//k/2bmnDPnmznf+Wbmu/dChw7taI/AlygCHRsZy+rVq7XrC/eHe8BtYWe4Gi6Er8LJ8JmOHTsuoGxHewTWfARIxHXhqXAS/AQ2h7cxuA72WfOjaffYpiNAUu0BJ8DWYBGdhsN12nQQ2yff4ghkt2wS6Wg8jYZbtNhjdYfbaZ7FNv5BtbjttIhlN2Y7BnrECVhJZRhxeS0Ivu4lcdieOd4KWxYHOg6AH8DmsKo5g7L+Lsp4EF/32FfNj7nvDFeWYxEXnsXbDJj4TgVx6BcHoWpLpcMOKMfADWOjqP489Tvgf+B7cF3YCw6Cx8L1YYrBCEbAS1NFG2n74vcJjGOzgrbytoSWxYFk7AhvgzksRzgCFiVqB3T7wmdgDssQ7teWoh/myrxdGT5KgmI8dw82baFkvr0L4pDfKTA+GK6AKdyaz2skaNhtBaekDsrtcZTZM2sjvltj4/XghnAzuDF0Rf/MwI9+9bcJrNplUufou8NcQvZObYva9Pd6G8FN4QZFdo3I6f+Nsp8ulJ0a6ZOzoW+Iq+NaO2cTy7DZHubisFNsFwfzHBQ5x7dx+B4ZdyqqYzefi/4Q/SSYBu67yPaEU7ExMc6Em8KwdZmsY/Exi7IK2B+HYBcYbNei/gi2T1UZakDAKTxCyL7QFzMD7zbp2Vj/T8B76D+TsgroXbmOhvG1JmM7Hl1X5GfDI6GfxTrmhcgdx83Y+FlsCWU/e9OwTxpXx38yNm9SLoH30tcXnSqg74/gRLgv1I/3y93mDcpHofF6kbIQ2Hp+HwiPgp7XtobKvN6H6OdQOn7HMJ2yENgeivIE+C2oH+O6HBqDGZT3w/vwU3mJRW48jYP2cb7R7BDi4HyMwz0KvYlbw/dgCjN6t5JRC/7QZ1TqqNy+snw9n665GRsToQbY3ZuxvTw1xGYgnJaxzYlMzt/ADWM/tM/KGI9E1g++ktEFkTf39OCL+s+CoplyFnoTpALariZ/g+5O9bAE5ZXQxKgB8v3hU7ARfIzRLXDz1BEyd76xsLnxYLL6eegDUAL1RuMwB9umeVA5CubwQHDckhJH/WHuzfJx5G4/bhveiBSuPDXAyJuTYnhsiPIkaFBbinvosF7wRX1IxsG/kNVLxtDFpCydDSl/GoTNlC+gryQk9R3hjGb6pOpbEVStPrQPg4tTwwbafgnSJYqHR5PHGugXmyylcYQ+KBuNw0xsO7lkir2aipq/j9RIGhO49M/NmPZGtilcldG1WsREetL5elhJrMjZbOpTodtjDscgHJJTRLLDqfeK2kVVjwsefURVgjSJsn8rY2YevomPhrtmLYuFrsznBjV+PKbcAiuJFXSUxsF4zIE5HIzwgkhxPvWDonaoGtdpMHefN0DuN3bOx2NNIyjFISSkNzQHzwWtwft0ej3T0WTcCnp+WZP4Mc68CTHm0PAI4FucZx7Lk+A8mOL7BK+RwE2g46nQJL4Z5h6sQ/BlMs6E90L7pPNdjWwiVO+5K/gZQv0QmMIx/xFeAe+DwZ5qBRdz3c3KrdMoe1Q0TZX5FKfAOB6DaM9qUlf9PQVfnSTS71Vpmj7uOx5ZPxji6m7lWTKGD/AR0Bxyng/DenH4J/qmeXHhu2AOuSeDfs0DZ26FOeyD0O/I18iWXfb1UuZCHuJrgN1pGds3kG2kMWVuy7bLONh0xil7pT1KRYIFtLcMF6beA36U2Pixz87BxpJ2Zzg9sbP5KkxtL8rYKTqh7MujUYoz4+uFOkaeu1ckxm71XeF2MP2SxAeiBtgZnxTuWiWg6A5zcegTbCzDtlK0Ovgkf9nhHMbCeHtaSnsizOEhhEvgxpHSt/6qZIt0Vn36f8Hb46eJ/C+0hyayzrTdsgKK/KZyV67cC+RVXPel4KxceqMvgr65xnB1vROOg5MjxQrqrlI5PIbwHdgtUrpzGlfzIs2Ng0isIcj9lGIRZcCFVEbBZdC8+RjGu5FxyaEqDiEhY8dxJ7fY1iLX18CYLOkkW3uNDgTFiY+o54AAGmAnvh509Uq3DkR14bnruYyFATdZTeiA3E0Munrl3ijXTgw8+jyYyJyzK41z7gnDouEcn9YW/dWWRaCvYwzx8EFOHzS76s9tfgH0bBywCZXR0F3FM6RxmQ6ncV0fhs+EkJCvF3jZBfk/CnSFYgbq6mOwUpj4TtLJfi7g2n1xfAB0xfGp98FwOzaorlx+zONNaAkct09+ilUIQkKkupa2e2U6vI3s3YzcpLspJ09lxMPt3nj0gz1gGg/jYpKlWItrLKO/9/+8VEm7e5nHlHXaupK7pY+h72tleYuKkJBTCnp9B/k1Bbp6YpNh24yBg1wITYw1CoJxEA4vg/2hK+FXDRtnBryIG5u+LGTMakXEY0+krqIDYbzC1RrXl/wS9aHQB70ejLlJL8/h+pcw9lH1OuR0YaV6FqWrQAq/TtwpFTbQ/gE2wXdsPpFBtmZFqduHMfr2+AA8HDaXjG5Pdf2h/7LAFbjFIB4D6DQBDobNJaPxKLwO92su+kHwr/AT2Aj8xOMmxmG/FqG0QnpROj9Ez5OS3m5vvtIPS+S+FXoGuRT6MU58gz1PmSApPD/enQqTduwnVnmtLBiH2/J1cP3EYDHth+EM+A6cX6Zz/jvMbVOIvzB8kLly6bty7o+xawjEwy35RmgZw7O7STodGo8F0OOA8jtg7oiFuHQm9QztR2N7UR4F+8M+sCsMuyzVKngeHk6f8Yx/ZZWmTiN2dgN2J8B0ZTsdp5NwOib2Q/tT5D5Z58TyOvWJ6FyJ6yEeT8mOazixHep0OhKdT2QMz16DGGPNiwj+NkPXcIBip59zfVbGf3dk3vS3Uh3z8Fy4OwwPcUfqHr1cIHaEMXw4jyUek2KhdfzYz1WyWdB/KkbSrytNeO+LYzgMDobpsWM3ZFvCebAhxAkwkR4eYI9JepoQNzAAV5TrTcRIfzV17b8ZyXJVn/Ar6GsCC4MYAlkSlP/sSukYYuxNY5dYkNR7JW2bHg1qkrFstw1lc9tY2fRzLUIswkUmU1EWLwhdaB8HR8IKykl0LYJ9KsKmyukU7mopniUeNclYNjLhTZoU/huqAQjPThQv4msEXIRcToN/xvZOyruh+RLgzpbuXEEXyqo4VCbPBUyQi6FLeQrPZb+Ffs95ATwQ7ky7N3wcNofrkoB4FnEyKYbh1y24BOrbU/kd7Nwkyf7NJbYfRvvkVwGZT/BV0Pl8kTDumycD8Ma+kMhsXsq49wvy8rwupO2DGuNDGuNhvMgEvR9w1yQGMuNwJXTXSGGiePw6MeFP6NcnNab934zMMb2fkQeRyVsVh6rBkzQvc7GzMLod5pLAwITgmFQ6rPJBO8U4BJfFQq7jDy+mIEuDapL7Rf4DlPoeCE3Keng5ozwQmT82Hk3p9r0BdNzDYD/4/4RxcoeIYUKOZnyPU86DlxMTPzb5A/UbYAxXsAfR3U/5LtwTHgxT3IUPf/43K1XQdoe5A92NlHOgieauZjz2hzm4uj0F58JtIgN3F7+F+xWl99C56OsSGK+ONDs8wZgWWgHLYBoHFw2/7TIOzs13klpgcDJ8H35W+K8PKytefCXkh8DcL4Jy1/RmpRiuP4TdoL/HK8LyjCL150td6UmlHJKxfxZZbsXdFblbWwy/ausR5krdXzbNhkWYhaJzeS5+fTi+yLCO3K8re5d9+CI0u46t8ViV6NNfSfmzttIcKP2OvAh+5Vh0D41xJdmpGwfnWoQ5KCq/9gnxK5Vk9VgqR8BnqhQtb3Shyym5blxjEnK/AmsOnq3+VGSEnzfRVa3AiW26gl+BPn25qkm2xEc9faqrajO+pfhydSuCK0cJ2LqangEfbZI09HcJVkPp+4rWlIspPHqlq5FqYTziMY6kPUFFhFj/e+TuNDm4IrpCpvA943zG8u+goN5wHEKfmpKMNavPhVNg+lQhagg+vd1rnCNA7orwa+jvCHNwZeoJfUp9EmO6RVSAbiicDYvwCoqhdqD0LBz78j84CCvkGYlOu6dhfJNK10XmCunqEvtyZ+lRMij/od0V5n7wgLg05tIKGfog8wfMP4eOqx4eRXlA6BeXyAfDmXU6v4nO94GO0B/XxHNYTLtH8Ed9LeiH3fX8oV7t6uuYBoS+cYncOHgky+F1hJ1qghw7CHUNqXve82y2O9wWepbwKfSM8Br0vOH5LLda+fP+H6HLAv++Xbsi94Wuqoug54o76ecW6PVkeIFx3G+hm0dZAXZb0DAY3iTtV0FXUMf2MPauHiZkHwrfRvWnr+VwBnq3IBOzJ4yvtRTdi8iqgO16CBy7q0TwtZK6vj6lrABbz7GD4LehYzOmHvinQ1/67FcF+vgRTn9o7LvB9aEroquhO8yTuX7IS6C/sTwMet/sLzxTPw2Nx3wF2PWi2MQqNB5FczBmjn8/uCPUv7HzRfgl+CScil/jngXXcg4hDttRD3F4jvq12U6tFXIxV9QZMIVPTvZJbu212vu1R6ChCJB4x0NfMlz2A93GfMtbpyEn7UZtNgIuz2scJJ5LcXrY9Vpv19ti1vhA2h1+5SLwP19ozDFgLBkcAAAAAElFTkSuQmCC"
}, function(e, n, t) {
  (function(e) {
    ! function(e) {
      "use strict";
      e.exports.is_uri = t, e.exports.is_http_uri = o, e.exports.is_https_uri = i, e.exports.is_web_uri = s, e.exports.isUri = t, e.exports.isHttpUri = o, e.exports.isHttpsUri = i, e.exports.isWebUri = s;
      var n = function(e) {
        return e.match(/(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/)
      };

      function t(e) {
        if (e && !/[^a-z0-9\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=\.\-\_\~\%]/i.test(e) && !/%[^0-9a-f]/i.test(e) && !/%[0-9a-f](:?[^0-9a-f]|$)/i.test(e)) {
          var t, o, i, s, a, r = "",
            l = "";
          if (r = (t = n(e))[1], o = t[2], i = t[3], s = t[4], a = t[5], r && r.length && i.length >= 0) {
            if (o && o.length) {
              if (0 !== i.length && !/^\//.test(i)) return
            } else if (/^\/\//.test(i)) return;
            if (/^[a-z][a-z0-9\+\-\.]*$/.test(r.toLowerCase())) return l += r + ":", o && o.length && (l += "//" + o), l += i, s && s.length && (l += "?" + s), a && a.length && (l += "#" + a), l
          }
        }
      }

      function o(e, o) {
        if (t(e)) {
          var i, s, a, r, l = "",
            u = "",
            c = "",
            d = "";
          if (l = (i = n(e))[1], u = i[2], s = i[3], a = i[4], r = i[5], l) {
            if (o) {
              if ("https" != l.toLowerCase()) return
            } else if ("http" != l.toLowerCase()) return;
            if (u) return /:(\d+)$/.test(u) && (c = u.match(/:(\d+)$/)[0], u = u.replace(/:\d+$/, "")), d += l + ":", d += "//" + u, c && (d += c), d += s, a && a.length && (d += "?" + a), r && r.length && (d += "#" + r), d
          }
        }
      }

      function i(e) {
        return o(e, !0)
      }

      function s(e) {
        return o(e) || i(e)
      }
    }(e)
  }).call(n, t(13)(e))
}, function(e, n) {
  e.exports = function(e) {
    return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", {
      enumerable: !0,
      get: function() {
        return e.l
      }
    }), Object.defineProperty(e, "id", {
      enumerable: !0,
      get: function() {
        return e.i
      }
    }), e.webpackPolyfill = 1), e
  }
}, function(e, n, t) {
  "use strict";
  Object.defineProperty(n, "__esModule", {
    value: !0
  }), n.default = void 0;
  var o = t(0),
    i = new o.CallbackArray,
    s = {
      isUserInEU: false,
      isUserInUS: true,
      userLocation: 'CA',
      setUserInEU: function(e) {
        this.isUserInEU = e
      },
      setUserInUS: function(e) {
        this.isUserInUS = e
      },
      checkUserIsInEU: function(e) {
        null === this.isUserInEU && (this.isUserInEU = !0), "function" == typeof e && e(this.isUserInEU)
      },
      checkUserIsInUS: function(e) {
        null === this.isUserInUS && (this.isUserInUS = !0), "function" == typeof e && e(this.isUserInUS)
      },
      checkUserLocation: function(e) {
        if (null !== this.userLocation && "PENDING" !== this.userLocation) e(this.userLocation);
        else {
          if (null === this.userLocation) {
            this.userLocation = "PENDING";
            (0, o.getJson)({
              url: "https://test-apis.quantcast.mgr.consensu.org/geoip"
            }, function(e) {
              a(e, function(e) {
                s.userLocation = e, i.call(s.userLocation)
              })
            })
          }
          i.push(e)
        }
      }
    },
    a = function(e, n) {
      try {
        if (4 === e.readyState) {
          if (200 !== e.status) throw "cannot fetch the user location";
          n((e.response ? "string" == typeof e.response ? JSON.parse(e.response) : e.response : JSON.parse(e.responseText)).region.toUpperCase())
        }
      } catch (e) {
        n("UNKNOWN")
      }
    },
    r = s;
  n.default = r
}, , function(e, n, t) {
  "use strict";

  function o(e) {
    "@babel/helpers - typeof";
    return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
      return typeof e
    } : function(e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    })(e)
  }
  Object.defineProperty(n, "__esModule", {
    value: !0
  }), n.getNonIABVendorConsents = n.getGooglePersonalization = n.getConsentData = n.getCurrentVendorConsents = n.getVendorConsents = n.retrieveParsedPublisherConsents = n.getCurrentPublisherConsents = n.getPublisherConsents = n.callbacksWaitingForConsent = n.runConsentUiCallback = n.setConsentUiCallback = n.calculateAcceptanceState = n.saveConsents = n.displayConsentUi = n.nonIabConsentValues = n.RepromptOptionsValues = n.googleConsentValues = n.publisherConsentValues = n.vendorConsentValues = void 0;
  var i = f(t(14)),
    s = f(t(17)),
    a = f(t(5)),
    r = f(t(6)),
    l = function(e) {
      if (e && e.__esModule) return e;
      if (null === e || "object" !== o(e) && "function" != typeof e) return {
        default: e
      };
      var n = E();
      if (n && n.has(e)) return n.get(e);
      var t = {},
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var s in e)
        if (Object.prototype.hasOwnProperty.call(e, s)) {
          var a = i ? Object.getOwnPropertyDescriptor(e, s) : null;
          a && (a.get || a.set) ? Object.defineProperty(t, s, a) : t[s] = e[s]
        } t.default = e, n && n.set(e, t);
      return t
    }(t(2)),
    u = t(3),
    c = t(0),
    d = t(4),
    p = t(1);

  function E() {
    if ("function" != typeof WeakMap) return null;
    var e = new WeakMap;
    return E = function() {
      return e
    }, e
  }

  function f(e) {
    return e && e.__esModule ? e : {
      default: e
    }
  }
  var T = new d.VendorConsentAccess;
  n.vendorConsentValues = T;
  var _ = new d.PublisherConsentAccess;
  n.publisherConsentValues = _;
  var g = new d.GoogleConsentAccess;
  n.googleConsentValues = g;
  var m = new d.RepromptOptionsAccess;
  n.RepromptOptionsValues = m;
  var h = new d.NonIabVendorConsentAccess;
  n.nonIabConsentValues = h;
  n.displayConsentUi = function(e, n, t) {
    if (l.default.mode !== p.MODE.USP && !(0, c.isUnsupportedBrowser)())
      if (e = e || 1, l.isConfigInitialized)
        if (window.__cmpui) window.__cmpui("init", e, n);
        else {
          var o = window.innerWidth <= 820 ? "popup" : l.default.uiLayout,
            i = document.createElement("script");
          i.type = "text/javascript", document.head.insertBefore(i, document.head.childNodes[0]), i.onload = function() {
            window.__cmpui("init", e, n)
          }, i.src = "https://static.quantcast.mgr.consensu.org/v30/cmpui-" + o + ".js", i.integrity = "banner" === o ? "sha256-kPYthtVl1oPNjp1VSY8+Qtu7M960IRyGrsm9YzUr/No=" : "sha256-98w3dHqFAVeROagEa3O3MUkKBYZDXv8OTsN2Sc9yziQ=", i.crossOrigin = "anonymous"
        }
    else console.error("You must initialize the config before displaying the consent ui!")
  };
  n.saveConsents = function(e, n, t) {
    if (!(0, c.isUnsupportedBrowser)()) {
      l.default.googlePersonalization && (g.setConsentValue(e.googlePurposeConsents), a.default.setGoogleConsentCookie(g.build(), null));
      var o = e.vendorList,
        i = r.default.getVendorIdMap(o);
      if (e.nonIabVendorList.length) var s = e.nonIabVendorList,
        d = r.default.getNonIabVendorIdMax(s);
      for (var p = e.publisherPurposes, E = p.length, f = 0; f < E; f++) _.setStandardPurposeConsent(e.publisherPurposeConsents[f], p[f].id);
      E && a.default.setPublisherConsentCookie(_.build(), null);
      var N = o.purposes,
        v = N.length;
      for (f = 0; f < v; f++) T.setPurposeConsent(e.purposeConsents[f], N[f].id);
      if (e.nonIabVendorList.length) {
        h.setMaxVendorId(d);
        for (var O = 0; O < s.length; O++) {
          var I = s[O].vendorId;
          h.setVendorConsent(e.nonIabVendorConsents[I], I)
        }
        a.default.setNonIabVendorsHashValue(r.default.nonIabVendorsHash, null), a.default.setNonIabVendorCookie(h.build(), null)
      }
      m.setInitScreenBodyTextOption(l.default.initScreenBodyTextOption), a.default.setRepromptOptionsValue(m.build(), null), "" !== r.default.blockedVendorsHash && a.default.setBlockedVendorsHashValue(r.default.blockedVendorsHash, null);
      var S = o.vendors,
        y = (0, c.filterVendorsByDeletedFlag)(r.default.latestVendors, !0),
        L = function(n, t) {
          for (var o = 0; o < n.length; o++) {
            var i = n[o].id;
            T.setVendorConsent(!t && e.vendorConsents[i], i)
          }
        };
      T.setMaxVendorId(i.max), L(S), L(y, !0), T.setVendorListVersion(o.vendorListVersion), T.setConsentScreen(e.consentPage), a.default.setVendorConsentCookie(T.build(), n), (0, u.logAcceptanceState)(C(e, t))
    }
  };
  var C = function(e, n) {
    if (void 0 !== n) return n ? "all" : "rejected";
    var t, o = null,
      i = null,
      s = null,
      a = null,
      r = function(e, n) {
        for (var t = 0, o = 0; o < n.length; o++) e[o] && (t += 1);
        return t === n.length || 0 !== t && null
      };
    if (o = !!e.googlePurposeConsents, e.nonIabVendorList.length) {
      for (var u = 0, c = 0; c < e.nonIabVendorList.length; c++) e.nonIabVendorConsents[e.nonIabVendorList[c].vendorId] && (u += 1);
      u === e.nonIabVendorList.length ? i = !0 : 0 === u && (i = !1)
    }
    var d = 0;
    for (c = 0; c < e.vendorList.vendors.length; c++) e.vendorConsents[e.vendorList.vendors[c].id] && (d += 1);
    if (d === e.vendorList.vendors.length ? s = !0 : 0 === d && (s = !1), t = r(e.purposeConsents, e.vendorList.purposes), l.default.publisherPurposeLegitimateInterestIds.length) {
      var p = [],
        E = [],
        f = !1;
      for (c = 0; c < e.publisherPurposes.length; c++) {
        var T = e.publisherPurposes[c],
          _ = e.publisherPurposes[c].id;
        if (l.default.publisherPurposeLegitimateInterestIds.indexOf(_) < 0) {
          var g = e.publisherPurposeConsents[_ - 1];
          p.push(T), E.push(g)
        }
      }
      0 === p.length && (f = !0), a = f ? t : r(E, p)
    } else a = r(e.publisherPurposeConsents, e.publisherPurposes);
    return l.default.publisherPurposeIds.length && e.nonIabVendorList.length ? o && i && s && a && t ? "all" : !1 === o && !1 === i && !1 === s && !1 === a && !1 === t ? "rejected" : "partial" : l.default.publisherPurposeIds.length || e.nonIabVendorList.length ? l.default.publisherPurposeIds.length && !e.nonIabVendorList.length ? o && s && a && t ? "all" : !1 === o && !1 === s && !1 === a && !1 === t ? "rejected" : "partial" : !l.default.publisherPurposeIds.length && e.nonIabVendorList.length ? o && s && t && i ? "all" : !1 === o && !1 === s && !1 === i && !1 === t ? "rejected" : "partial" : void 0 : o && s && t ? "all" : !1 === o && !1 === s && !1 === t ? "rejected" : "partial"
  };
  n.calculateAcceptanceState = C;
  var N = [];
  n.setConsentUiCallback = function(e) {
    "function" == typeof e && N.push(e)
  };
  n.runConsentUiCallback = function(e) {
    if (N.length > 0)
      for (var n = [].concat(N); n.length > 0;) n.shift()(e)
  };
  var v = [];
  n.callbacksWaitingForConsent = v;
  n.getPublisherConsents = function(e, n) {
    if (s.default.isInitialized) return O(e, n);
    v.push(["getPublisherConsents", e, n])
  };
  var O = function(e, t) {
    I(function(o, i) {
      var s = {},
        a = i;
      i && "parsed" === o.status && (n.publisherConsentValues = _ = o.publisherConsentValues, (0, c.isArray)(e) && e.length > 0 ? (e.forEach(function(e) {
        s[e] = _.getStandardPurposeConsent(e)
      }), a = !0) : null === e || void 0 === e || (0, c.isArray)(e) && 0 === e.length ? (s = _.getStandardPurposeConsent(), a = !0) : (s = null, a = !1)), (0, c.doCallback)(t, {
        standardPurposeConsents: s
      }, a)
    })
  };
  n.getCurrentPublisherConsents = O;
  var I = function(e) {
    l.default.publisherPurposeIds && 0 != l.default.publisherPurposeIds.length ? a.default.fetchPublisherConsentCookie(function(n, t) {
      if (t)
        if ("notfound" !== n.status) {
          var o = new d.PublisherConsentAccess;
          o.setAll(n.value) ? (0, c.doCallback)(e, {
            status: "parsed",
            publisherConsentValues: o
          }, !0) : (0, c.doCallback)(e, {
            status: "parse_error"
          }, !1)
        } else(0, c.doCallback)(e, {
          status: "notfound"
        }, !0);
      else(0, c.doCallback)(e, {
        status: "fetch_error"
      }, !1)
    }) : (0, c.doCallback)(e, {
      status: "notneeded"
    }, !0)
  };
  n.retrieveParsedPublisherConsents = I;
  n.getVendorConsents = function(e, n) {
    b("getVendorConsents", e, n, !0)
  };
  var S = function(e, n) {
    (0, c.isUnsupportedBrowser)() || b("getCurrentVendorConsents", e, n, !1)
  };
  n.getCurrentVendorConsents = S;
  var y = function(e) {
      return !!(e || l.default && "always" === l.default.displayUi)
    },
    L = function(e, n, t) {
      "function" == typeof e && e({
        metadata: null,
        gdprApplies: y(n),
        hasGlobalConsent: a.default.isGlobalScope,
        hasGlobalScope: a.default.isGlobalScope,
        purposeConsents: t ? {} : null,
        vendorConsents: t ? {} : null
      }, !0)
    },
    b = function(e, n, t, o) {
      if ("function" == typeof t) {
        var l = !1;
        l = o ? s.default.isInitialized : !!a.default.cookie[p.VENDOR_CONSENT_COOKIE_NAME];
        var u = a.default.cookie[p.VENDOR_CONSENT_COOKIE_NAME];
        l ? i.default.checkUserIsInEU(function(e) {
          var o = {};
          if (u && "notfound" !== u.status)
            if (T.setAll(u.value)) {
              if (r.default.isBetaVendorListVersion(T) && L(t, e, !0), n && 0 !== n.length)
                for (s = 0; s < n.length; s++) o[n[s]] = T.getVendorConsent(n[s]);
              else {
                var i = T.getVendorConsent(null);
                if (i)
                  for (var s = 0; s < i.length; s++) void 0 !== i[s] && (o[s] = !!i[s])
              }
              "function" == typeof t && t({
                metadata: (0, c.isUnsupportedBrowser)() ? null : T.getMetadata(!0),
                gdprApplies: y(e),
                hasGlobalConsent: a.default.isGlobalScope,
                hasGlobalScope: a.default.isGlobalScope,
                purposeConsents: T.getPurposeConsent(),
                vendorConsents: o
              }, !0)
            } else(0, c.logError)("error fetching consents"), L(t, e, !1);
          else L(t, e, !0)
        }) : "getVendorConsents" === e ? v.push(["getVendorConsents", n, t]) : "getCurrentVendorConsents" === e && a.default.fetchVendorConsentCookie(function() {
          S(n, t)
        })
      }
    };
  n.getConsentData = function(e, n) {
    (0, c.isUnsupportedBrowser)() || (null === e || void 0 === e || e == p.CONSENT_STRING_VERSION ? s.default.isInitialized ? i.default.checkUserIsInEU(function(e) {
      try {
        var t = a.default.cookie[p.VENDOR_CONSENT_COOKIE_NAME].value;
        "function" == typeof n && n({
          gdprApplies: y(e),
          hasGlobalConsent: a.default.isGlobalScope,
          hasGlobalScope: a.default.isGlobalScope,
          consentData: t
        }, !0)
      } catch (t) {
        "function" == typeof n && n({
          gdprApplies: y(e),
          hasGlobalConsent: null,
          hasGlobalScope: null,
          consentData: null
        }, !1)
      }
    }) : v.push(["getConsentData", e, n]) : "function" == typeof n && n(null, !1))
  };
  n.getGooglePersonalization = function(e) {
    (0, c.isUnsupportedBrowser)() || (s.default.isInitialized ? a.default.fetchGoogleConsentCookie(function(n) {
      g.setAll(n.value), "function" == typeof e && e({
        googlePersonalizationData: g.fields
      }, void 0 !== n.value)
    }) : v.push(["getGooglePersonalization", e, null]))
  };
  n.getNonIABVendorConsents = function(e, n) {
    (0, c.isUnsupportedBrowser)() || "function" == typeof n && (s.default.isInitialized ? i.default.checkUserIsInEU(function(t) {
      a.default.fetchNonIabConsentCookie(function(o) {
        var i = {};
        if (o && "notfound" !== o.status)
          if (h.setAll(o.value)) {
            if (e)
              for (r = 0; r < e.length; r++) i[e[r]] = h.getVendorConsent([e[r]]);
            else {
              var s = h.getVendorConsent(null);
              if (s)
                for (var r = 0; r < s.length; r++) void 0 !== s[r] && (i[r] = !!s[r])
            }
            "function" == typeof n && n({
              metadata: (0, c.isUnsupportedBrowser)() ? null : h.getMetadata(!0),
              gdprApplies: y(t),
              hasGlobalConsent: a.default.isGlobalScope,
              hastGlobalScope: a.default.isGlobalScope,
              nonIABVendorConsents: i
            }, !0)
          } else n({}, !1);
        else n({}, !1)
      })
    }) : v.push(["getNonIABVendorConsents", e, n]))
  }
}, function(e, n, t) {
  "use strict";
  Object.defineProperty(n, "__esModule", {
    value: !0
  }), n.default = n.postInit = n.parsedPublisherConsentsCallback = n.googleConsentCookieCallback = n.vendorConsentCookieCallback = n.displayOrRunCallbackIfNonconsenter = n.getCurrentPublisherConsentsCallback = n.getCurrentVendorConsentsCallback = n.repromptOptionsAccessCallback = n.nonIabConsentCookieCallback = void 0;
  var o = t(0),
    i = t(16),
    s = t(1),
    a = E(t(14)),
    r = E(t(5)),
    l = E(t(20)),
    u = E(t(6)),
    c = t(4),
    d = function(e) {
      if (e && e.__esModule) return e;
      if (null === e || "object" !== f(e) && "function" != typeof e) return {
        default: e
      };
      var n = p();
      if (n && n.has(e)) return n.get(e);
      var t = {},
        o = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var i in e)
        if (Object.prototype.hasOwnProperty.call(e, i)) {
          var s = o ? Object.getOwnPropertyDescriptor(e, i) : null;
          s && (s.get || s.set) ? Object.defineProperty(t, i, s) : t[i] = e[i]
        } t.default = e, n && n.set(e, t);
      return t
    }(t(2));

  function p() {
    if ("function" != typeof WeakMap) return null;
    var e = new WeakMap;
    return p = function() {
      return e
    }, e
  }

  function E(e) {
    return e && e.__esModule ? e : {
      default: e
    }
  }

  function f(e) {
    "@babel/helpers - typeof";
    return (f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
      return typeof e
    } : function(e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    })(e)
  }
  var T = function(e, n) {
    n && "notfound" !== e.status ? n && u.default.isNonIabVendorsHashUpdated(function() {
      (0, i.displayConsentUi)(null, null, !0)
    }) : (0, i.displayConsentUi)(null, null, !0)
  };
  n.nonIabConsentCookieCallback = T;
  var _ = function(e, n) {
    if (n) {
      var t = new c.RepromptOptionsAccess,
        o = "object" === f(e) ? e.value : e;
      if (t.setAll(o)) t.getInitScreenBodyTextOption() != d.default.initScreenBodyTextOption && (0, i.displayConsentUi)()
    } else(0, i.displayConsentUi)()
  };
  n.repromptOptionsAccessCallback = _;
  var g = function(e) {
    var n = new c.VendorConsentAccess;
    (0, o.isObjectAllFalse)(e.purposeConsents) && u.default.shouldUpdateVendorList(n.getLastUpdated()) ? (0, i.displayConsentUi)(null, null, !0) : ((0, i.runConsentUiCallback)({
      reason: "consent-current",
      uiShown: !1
    }), (0, o.displayPersistentConsentLink)(d.default))
  };
  n.getCurrentVendorConsentsCallback = g;
  var m = function(e) {
    (0, o.isObjectAllFalse)(e.standardPurposeConsents) ? (0, i.getCurrentVendorConsents)(null, g) : ((0, i.runConsentUiCallback)({
      reason: "consent-current",
      uiShown: !1
    }), (0, o.displayPersistentConsentLink)(d.default))
  };
  n.getCurrentPublisherConsentsCallback = m;
  var h = function() {
    (0, i.getCurrentPublisherConsents)(null, m)
  };
  n.displayOrRunCallbackIfNonconsenter = h;
  var C = function(e, n) {
    if (n && "notfound" !== e.status)
      if ("found" === e.status) {
        var t = new c.VendorConsentAccess;
        if (t.setAll(e.value)) {
          var a = u.default.isBetaVendorListVersion(t),
            r = t.getCmpId();
          "" !== d.default.publisherVendorListUrl && u.default.isBlockedVendorsHashUpdated(function() {
            (0, i.displayConsentUi)(null, null, !0)
          }), (r < 0 || r > s.MAX_VALID_CMP_ID || -1 !== s.NOT_VALID_CMP_IDS.indexOf(r)) && (0, i.displayConsentUi)(null, null, !0), (0, o.fetchLatestGVl)(function(e) {
            for (var n = t.getVendorConsent(), s = (0, o.filterVendorsByDeletedFlag)(e.vendors, !0), r = 0; r < s.length; r++) n[s[r].id] && (0, i.displayConsentUi)(null, null, !0);
            if (u.default.shouldUpdateVendorList(t.getLastUpdated()) || a) {
              var l = a ? 0 : t.getVendorListVersion();
              e.vendorListVersion > l ? (0, i.displayConsentUi)(null, null, !0) : h()
            } else h()
          })
        } else(0, o.logError)("error parsing cookie"), (0, i.displayConsentUi)(null, null, !0)
      } else(0, o.logError)("Fetch Cookie response is invalid: ", e.status);
    else(0, i.displayConsentUi)(null, null, !0)
  };
  n.vendorConsentCookieCallback = C;
  var N = function(e, n) {
    if (d.default.googlePersonalization) {
      if (!n || "notfound" === e.status) return void(0, i.displayConsentUi)(null, null, !0)
    } else n && (document.cookie = s.GOOGLE_CONSENT_COOKIE_NAME + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; max-age=-1; domain=" + d.default.cookieDomain);
    r.default.fetchVendorConsentCookie(C), r.default.fetchRepromptOptionsValue(_), "" !== d.default.nonIabVendorListUrl && r.default.fetchNonIabConsentCookie(T)
  };
  n.googleConsentCookieCallback = N;
  var v = function(e, n) {
    n && "notfound" !== e.status ? r.default.fetchGoogleConsentCookie(N) : (0, i.displayConsentUi)(null, null, !0)
  };
  n.parsedPublisherConsentsCallback = v;
  var O = function() {
    (0, i.setConsentUiCallback)(function() {
      I.isInitialized = !0, (0, o.executePendingCalls)(i.callbacksWaitingForConsent)
    }), (0, o.isUnsupportedBrowser)() ? (a.default.setUserInEU(!1), a.default.setUserInUS(!1), d.default.mode & s.MODE.GDPR && I.initConsentStateForIE()) : d.default.mode & s.MODE.GDPR ? "always" === d.default.displayUi ? d.default.mode & s.MODE.USP ? a.default.checkUserIsInUS(function(e) {
      e ? I.isInitialized = !0 : I.initConsentState()
    }) : I.initConsentState() : "inEU" === d.default.displayUi ? a.default.checkUserIsInEU(function(e) {
      e ? I.initConsentState() : (0, i.runConsentUiCallback)({
        reason: "not-EU",
        uiShown: !1
      })
    }) : a.default.checkUserIsInUS(function(e) {
      e && (I.isInitialized = !0)
    }) : d.default.mode === s.MODE.USP && (I.isInitialized = !0)
  };
  n.postInit = O;
  var I = {
      isInitialized: !1,
      initCalled: !1,
      initConsentState: function() {
        (0, i.retrieveParsedPublisherConsents)(v)
      },
      initUspLocation: function() {
        a.default.checkUserIsInUS(function(e) {
          e && (d.default.uspJurisdiction.includes("US") ? (a.default.userLocation = "US", (0, o.logDebugMsg)("initUspLocation:" + a.default.userLocation)) : a.default.checkUserLocation(function(e) {
            (0, o.logDebugMsg)("initUspLocation: " + e)
          }))
        })
      },
      initConsentStateForIE: function() {
        for (var e = d.default.publisherPurposeIds, n = e.length, t = 0; t < n; t++) i.publisherConsentValues.setStandardPurposeConsent(!0, e[t]);
        for (t = 1; t <= 5; t++) i.vendorConsentValues.setPurposeConsent(!0, t);
        i.vendorConsentValues.setMaxVendorId(300);
        for (t = 1; t <= 300; t++) i.vendorConsentValues.setVendorConsent(!1, t);
        (0, i.runConsentUiCallback)({
          reason: "unsupported-browser",
          uiShown: !1
        })
      },
      init: function(e) {
        if (I.initCalled) console.warn("init has already been called and should only be run one time.");
        else {
          I.initCalled = !0, !e && d.isConfigInitialized || (0, d.initializeConfig)(e), d.default.mode & s.MODE.USP && I.initUspLocation();
          var n = function(e) {
            return function() {
              r.default.init(d.default, e), O()
            }
          };
          l.default.setup(n(!0), n(!1))
        }
      }
    },
    S = I;
  n.default = S
}, , , function(e, n, t) {
  "use strict";
  Object.defineProperty(n, "__esModule", {
    value: !0
  }), n.default = void 0;
  var o = t(1),
    i = {
      setup: function(e, n) {
        var t = !1,
          i = !1,
          s = function() {
            var e = document.getElementById("qc_choice_3pc_frame");
            try {
              e && document.body.removeChild(e)
            } catch (e) {}
          },
          a = setTimeout(function() {
            i || (t = !0, -1 != document.cookie.indexOf(o.THIRD_PARTY_COOKIE_MARK + "=1") ? e() : (document.cookie.indexOf(o.THIRD_PARTY_COOKIE_MARK + "=0"), n()), s())
          }, o.THIRD_PARTY_COOKIE_CHECK_TIMEOUT),
          r = function(r) {
            "string" == typeof r.data && -1 != r.data.indexOf("3PC_check:") && (clearTimeout(a), t || (i = !0, "3PC_check:supported" === r.data ? (document.cookie = o.THIRD_PARTY_COOKIE_MARK + "=1; path=/;SameSite=Lax;secure", e()) : "3PC_check:unsupported" === r.data && (document.cookie = o.THIRD_PARTY_COOKIE_MARK + "=0; path=/;SameSite=Lax;secure", n()), s()))
          };
        void 0 == window.addEventListener ? window.attachEvent("onmessage", r) : window.addEventListener("message", r, !1);
        ! function e() {
          if (document.body) {
            var n = document.createElement("iframe");
            n.style.display = "none", n.src = "https://static.quantcast.mgr.consensu.org/v30/cmp-3pc-check.html", n.id = "qc_choice_3pc_frame", n.integrity = "sha256-2neDM51KOtHUCt0GFO6Z4WH/kLShc93ZxyI57ZpewDs=", n.crossOrigin = "anonymous", document.body.appendChild(n)
          } else setTimeout(e, 10)
        }()
      }
    };
  n.default = i
}, , , , , function(e, n, t) {
  "use strict";

  function o(e) {
    "@babel/helpers - typeof";
    return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
      return typeof e
    } : function(e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    })(e)
  }
  var i = t(2),
    s = T(t(16)),
    a = E(t(17)),
    r = (E(t(26)), E(t(6))),
    l = E(t(27)),
    u = t(0),
    c = E(t(9)),
    d = T(t(28)),
    p = E(t(14));

  function E(e) {
    return e && e.__esModule ? e : {
      default: e
    }
  }

  function f() {
    if ("function" != typeof WeakMap) return null;
    var e = new WeakMap;
    return f = function() {
      return e
    }, e
  }

  function T(e) {
    if (e && e.__esModule) return e;
    if (null === e || "object" !== o(e) && "function" != typeof e) return {
      default: e
    };
    var n = f();
    if (n && n.has(e)) return n.get(e);
    var t = {},
      i = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var s in e)
      if (Object.prototype.hasOwnProperty.call(e, s)) {
        var a = i ? Object.getOwnPropertyDescriptor(e, s) : null;
        a && (a.get || a.set) ? Object.defineProperty(t, s, a) : t[s] = e[s]
      } return t.default = e, n && n.set(e, t), t
  }
  var _ = [];
  window.__cmp = new function(e) {
    var n;
    if (e.__cmp) {
      n = e.__cmp.gdprAppliesGlobally;
      try {
        if (e.__cmp("__cmp")) return e.__cmp;
        _ = __cmp() || []
      } catch (n) {
        return e.__cmp
      }
    }
    var t = function(e) {
      return {
        displayConsentUi: s.displayConsentUi,
        getConfig: i.getConfig,
        getCurrentVendorConsents: s.getCurrentVendorConsents,
        getConsentData: s.getConsentData,
        getGooglePersonalization: s.getGooglePersonalization,
        getPublisherConsents: s.getPublisherConsents,
        getCurrentPublisherConsents: s.getCurrentPublisherConsents,
        getVendorConsents: s.getVendorConsents,
        getVendorList: r.default.getVendorList,
        getNonIabVendorList: r.default.getNonIabVendorList,
        getNonIABVendorConsents: s.getNonIABVendorConsents,
        getGoogleVendorList: l.default.getGoogleVendorList,
        init: a.default.init,
        initConfig: i.initializeConfig,
        runConsentUiCallback: s.runConsentUiCallback,
        saveConsents: s.saveConsents,
        setConsentUiCallback: s.setConsentUiCallback,
        fetchPurposeList: c.default.fetchPurposeList,
        ping: function(e, n) {
          var t = i.config.displayUi ? "always" === i.config.displayUi : window.__cmp.gdprAppliesGlobally;
          (0, u.doCallback)(n, {
            gdprAppliesGlobally: t,
            cmpLoaded: !0
          }, !0)
        },
        uspPing: function(e, n) {
          p.default.checkUserLocation(function(e) {
            (0, u.doCallback)(n, {
              mode: i.config.mode,
              jurisdiction: i.config.uspJurisdiction,
              location: e,
              cmpLoaded: !0
            }, !0)
          })
        },
        getUSPData: d.getUspData,
        setUspDftData: d.setUspDftData,
        displayUspUi: d.displayUspUi,
        setUspData: d.setUspData,
        __cmp: function() {
          return !0
        }
      } [e].apply(null, [].slice.call(arguments, 1))
    };
    return t.gdprAppliesGlobally = n, t
  }(window), window.__uspapi = new function(e) {
    if (e.__uspapi) try {
      if (e.__uspapi("__uspapi")) return e.__uspapi;
      _ = e.__uspapi() || []
    } catch (n) {
      return e.__uspapi
    }
    return function(e) {
      return {
        getUSPData: d.getUspData,
        __uspapi: function() {
          return !0
        }
      } [e].apply(null, [].slice.call(arguments, 1))
    }
  }(window), (0, u.executePendingCalls)(_)
}, function(e, n, t) {
  "use strict";
  window.NodeList && !window.NodeList.prototype.forEach && (NodeList.prototype.forEach = function(e, n) {
    n = n || window;
    for (var t = 0; t < this.length; t++) e.call(n, this[t], t, this)
  }), Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
    value: function(e) {
      if (null == this) throw new TypeError('"this" is null or not defined');
      var n = Object(this),
        t = n.length >>> 0;
      if ("function" != typeof e) throw new TypeError("predicate must be a function");
      for (var o = arguments[1], i = 0; i < t;) {
        var s = n[i];
        if (e.call(o, s, i, n)) return s;
        i++
      }
    },
    configurable: !0,
    writable: !0
  }), Array.prototype.fill || Object.defineProperty(Array.prototype, "fill", {
    value: function(e) {
      if (null == this) throw new TypeError("this is null or not defined");
      for (var n = Object(this), t = n.length >>> 0, o = arguments[1] >> 0, i = o < 0 ? Math.max(t + o, 0) : Math.min(o, t), s = arguments[2], a = void 0 === s ? t : s >> 0, r = a < 0 ? Math.max(t + a, 0) : Math.min(a, t); i < r;) n[i] = e, i++;
      return n
    }
  }), Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", {
    value: function(e, n) {
      if (null == this) throw new TypeError('"this" is null or not defined');
      var t = Object(this),
        o = t.length >>> 0;
      if (0 === o) return !1;
      var i = 0 | n,
        s = Math.max(i >= 0 ? i : o - Math.abs(i), 0);

      function a(e, n) {
        return e === n || "number" == typeof e && "number" == typeof n && isNaN(e) && isNaN(n)
      }
      for (; s < o;) {
        if (a(t[s], e)) return !0;
        s++
      }
      return !1
    }
  }), String.prototype.startsWith || function() {
    var e = function() {
        try {
          var e = {},
            n = Object.defineProperty,
            t = n(e, e, e) && n
        } catch (e) {}
        return t
      }(),
      n = {}.toString,
      t = function(e) {
        if (null == this) throw TypeError();
        var t = String(this);
        if (e && "[object RegExp]" == n.call(e)) throw TypeError();
        var o = t.length,
          i = String(e),
          s = i.length,
          a = arguments.length > 1 ? arguments[1] : void 0,
          r = a ? Number(a) : 0;
        r != r && (r = 0);
        var l = Math.min(Math.max(r, 0), o);
        if (s + l > o) return !1;
        for (var u = -1; ++u < s;)
          if (t.charCodeAt(l + u) != i.charCodeAt(u)) return !1;
        return !0
      };
    e ? e(String.prototype, "startsWith", {
      value: t,
      configurable: !0,
      writable: !0
    }) : String.prototype.startsWith = t
  }(), Array.prototype.filter || (Array.prototype.filter = function(e, n) {
    if ("Function" != typeof e && "function" != typeof e || !this) throw new TypeError;
    var t = this.length >>> 0,
      o = new Array(t),
      i = this,
      s = 0,
      a = -1;
    if (void 0 === n)
      for (; ++a !== t;) a in this && e(i[a], a, i) && (o[s++] = i[a]);
    else
      for (; ++a !== t;) a in this && e.call(n, i[a], a, i) && (o[s++] = i[a]);
    return o.length = s, o
  })
}, function(e, n, t) {
  "use strict";
  Object.defineProperty(n, "__esModule", {
    value: !0
  }), n.default = void 0;
  var o = {
    getGoogleVendorList: function(e) {
      var n = new XMLHttpRequest;
      n.open("GET", "https://2ttq8jlhg5.execute-api.us-west-2.amazonaws.com/default/google-vendor-list-proxy", !0), n.addEventListener("load", function() {
        n.status >= 200 && n.status < 400 ? e(JSON.parse(n.responseText), !0) : e(null, !1)
      }), n.send()
    }
  };
  n.default = o
}, function(e, n, t) {
  "use strict";

  function o(e) {
    "@babel/helpers - typeof";
    return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
      return typeof e
    } : function(e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    })(e)
  }
  Object.defineProperty(n, "__esModule", {
    value: !0
  }), n.displayUspUi = n.setUspData = n.setUspDftData = n.getUspData = void 0;
  var i = p(t(17)),
    s = p(t(14)),
    a = p(t(5)),
    r = function(e) {
      if (e && e.__esModule) return e;
      if (null === e || "object" !== o(e) && "function" != typeof e) return {
        default: e
      };
      var n = d();
      if (n && n.has(e)) return n.get(e);
      var t = {},
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var s in e)
        if (Object.prototype.hasOwnProperty.call(e, s)) {
          var a = i ? Object.getOwnPropertyDescriptor(e, s) : null;
          a && (a.get || a.set) ? Object.defineProperty(t, s, a) : t[s] = e[s]
        } t.default = e, n && n.set(e, t);
      return t
    }(t(2)),
    l = t(0),
    u = t(16),
    c = t(1);

  function d() {
    if ("function" != typeof WeakMap) return null;
    var e = new WeakMap;
    return d = function() {
      return e
    }, e
  }

  function p(e) {
    return e && e.__esModule ? e : {
      default: e
    }
  }

  function E(e, n) {
    for (var t = 0; t < n.length; t++) {
      var o = n[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
    }
  }
  var f = /^[1][nNyY-][nNyY-][nNyY-]$/,
    T = new(function() {
      function e() {
        ! function(e, n) {
          if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function")
        }(this, e), this.version = c.USP_APIVER, this.noticegiven = "-", this.optedout = "-", this.lspact = "-", this.baseString = null
      }
      return function(e, n, t) {
        n && E(e.prototype, n), t && E(e, t)
      }(e, [{
        key: "getUsprivacyString",
        value: function() {
          return this.baseString
        }
      }, {
        key: "setUsprivacyString",
        value: function(e) {
          var n = !1;
          return f.test(e) && (this.version = parseInt(e[0], 10), this.noticegiven = e[1], this.optedout = e[2], this.lspact = e[3], this.baseString = e, n = !0), n
        }
      }, {
        key: "getVersion",
        value: function() {
          return this.version
        }
      }]), e
    }());
  n.getUspData = function(e, n) {
    e === c.USP_APIVER ? (0, l.isUnsupportedBrowser)() || (i.default.isInitialized ? a.default.fetchUSPrivacyCookie(function(e) {
      var t, o = !0;
      T.setUsprivacyString(e.value) || (o = !1), (t = T.getUsprivacyString()) ? "function" == typeof n && n({
        version: T.getVersion(),
        uspString: t
      }, o) : "function" == typeof n && n({
        version: null,
        uspString: null
      }, o)
    }) : u.callbacksWaitingForConsent.push(["getUSPData", e, n])) : "function" == typeof n && n(null, !1)
  };
  n.setUspDftData = function(e, n) {
    e === c.USP_APIVER ? (0, l.isUnsupportedBrowser)() || (i.default.isInitialized ? a.default.fetchUSPrivacyCookie(function(e) {
      if (!e.value) {
        var t = T.setUsprivacyString(c.USP_APIVER + "YN" + r.default.uspLspact);
        a.default.setUspCookie(T.getUsprivacyString(), function() {
          "function" == typeof n && n({
            version: T.getVersion(),
            uspString: T.getUsprivacyString()
          }, t)
        })
      }
    }) : u.callbacksWaitingForConsent.push(["setUspDftData", e, n])) : "function" == typeof n && n(null, !1)
  };
  n.setUspData = function(e, n, t) {
    if (e === c.USP_APIVER) {
      if (!(0, l.isUnsupportedBrowser)())
        if (i.default.isInitialized) {
          var o = T.setUsprivacyString(c.USP_APIVER + "Y" + (n ? "Y" : "N") + r.default.uspLspact);
          a.default.setUspCookie(T.getUsprivacyString(), function() {
            "function" == typeof t && t({
              version: T.getVersion(),
              uspString: T.getUsprivacyString()
            }, o)
          })
        } else u.callbacksWaitingForConsent.push(["setUspData", e, n, t])
    } else "function" == typeof t && t(null, !1)
  };
  n.displayUspUi = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
    (0, l.isUnsupportedBrowser)() || 1 === e && (r.isConfigInitialized ? s.default.checkUserLocation(function(n) {
      if (c.US_STATES.includes(n) && r.default.uspJurisdiction.includes(n))
        if (window.__uspui) window.__uspui("init", e);
        else {
          var t = document.createElement("script");
          t.type = "text/javascript", t.onload = function() {
            window.__uspui("init", e)
          }, t.src = "https://static.quantcast.mgr.consensu.org/v30/uspui-popup.js", t.integrity = "sha256-bp2gB9+rMTxgZlDGIDBjfKxWkcNanV8v/bbM9v7O5qw=", t.crossOrigin = "anonymous", document.head.insertBefore(t, document.head.childNodes[0])
        }
      else console.log("Detected User Location Does Not Match USP Configuration: " + n)
    }) : console.error("You must initialize the config before displaying the consent ui!"))
  }
}]);
