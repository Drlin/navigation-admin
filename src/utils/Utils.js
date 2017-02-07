const CookieUtil = {
	get: function(name) {
		var subCookie = this.getAll(name);

		if (subCookie) {
			return subCookie[name]
		} else {
			return null
		}
	},
	getAll: function(name) {
		var cookieName = encodeURIComponent(name) + '=',
			cookieStart = document.cookie.indexOf(cookieName),
			cookieValue = null,
			cookieEnd,
			subCookies,
			i, 
			parts,
			result = {};

		if (cookieStart > -1) {
			cookieEnd = document.cookie.indexOf(';', cookieStart);
			if (cookieEnd == -1) {
				cookieEnd = document.cookie.length;
			}
			cookieValue = document.cookie.substring(cookieStart + cookieName.length, cookieEnd)
			if (cookieValue.length > 0) {
				subCookies = cookieValue.split('&')
				for (i = 0; i < subCookies.length; i++) {
					parts = subCookies[i].split('=');
					result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1])
				}
			}
			return result;
		}
		return null;
	},
	set: function(name, subName, value, expires, path, domain, secure) {
		var subCookies = this.getAll(name) || {};
		subCookies[subName] = value
		this.setAll(name, subName, value, expires, path, domain, secure);
	},
	setAll: function(name, subCookies, expires, path, domain, secure) {
		var cookieText = encodeURIComponent(name) + '=',
			subCookieParts = new Array(),
			subName;

		for (subName in subCookies) {
			if (subName.length > 0 && subCookies.hasOwnProperty(subName)) {
				subCookieParts.push(decodeURIComponent(subName) + '=' + encodeURIComponent(subCookies[subName]))
			}
		}
		if (subCookieParts.length > 0) {
			cookieText += subCookieParts.join('&');
			if (expires instanceof Date) {
				
				cookieText += '; expires=' + expires.toGMTString();
			}
			if (path) {
				cookieText += '; path=' + path;
			}
			if (domain) {
				cookieText += '; domain=' + domain;
			}
			if (secure) {
				cookieText += '; secure=' + secure;
			}
		} else {
			cookieText += '; expires=' + (new Date(0)).toGMTString();
		}
		document.cookie = cookieText;
	},
	unset: function (name, subName, path, domain, secure) {
		var subCookies = this.getAll(name);
		if (subCookies) {
			delete subCookies[subName];
			this.setAll(name, subCookies, null, path, domain, secure);
		}
	},
	unsetAll: function(name, path, domain, secure) {
		this.setAll(name, null, new Date(0), path, domain, secure);
	}
}

export default CookieUtil;