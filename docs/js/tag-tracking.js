// Sustituye estos valores por el identificador real cuando lo tengais.
(function () {
	var PLACEHOLDER_GTM_ID = "GTM-XXXXXXX";
	var PLACEHOLDER_GA4_ID = "G-XXXXXXXXXX";
	var defaultConfig = {
		gtmId: PLACEHOLDER_GTM_ID,
		ga4Id: PLACEHOLDER_GA4_ID
	};
	var customConfig = window.TAG_TRACKING_CONFIG || {};
	var config = {
		gtmId: customConfig.gtmId || defaultConfig.gtmId,
		ga4Id: customConfig.ga4Id || defaultConfig.ga4Id
	};

	function hasScriptMatching(pattern) {
		var scripts = document.getElementsByTagName("script");
		for (var i = 0; i < scripts.length; i += 1) {
			var src = scripts[i].getAttribute("src") || "";
			if (pattern.test(src)) {
				return true;
			}
		}
		return false;
	}

	function isConfigured(id, placeholder) {
		return typeof id === "string" && id.trim() !== "" && id.trim() !== placeholder;
	}

	function pushToDataLayer(eventName, payload) {
		window.dataLayer = window.dataLayer || [];
		var eventPayload = payload || {};
		eventPayload.event = eventName;
		window.dataLayer.push(eventPayload);
	}

	function loadScript(src, key) {
		if (document.querySelector('script[data-tag-tracking="' + key + '"]')) {
			return;
		}

		var script = document.createElement("script");
		script.async = true;
		script.src = src;
		script.setAttribute("data-tag-tracking", key);
		document.head.appendChild(script);
	}

	function trimText(value, maxLength) {
		var normalized = (value || "").replace(/\s+/g, " ").trim();
		if (normalized.length <= maxLength) {
			return normalized;
		}
		return normalized.slice(0, maxLength);
	}

	function isOutboundLink(link) {
		if (!link || !link.href) {
			return false;
		}

		try {
			return new URL(link.href, window.location.href).origin !== window.location.origin;
		} catch (error) {
			return false;
		}
	}

	function setupPageTracking() {
		if (document.documentElement.dataset.tagTrackingReady === "true") {
			return;
		}

		document.documentElement.dataset.tagTrackingReady = "true";

		pushToDataLayer("page_view", {
			page_title: document.title,
			page_path: window.location.pathname + window.location.search + window.location.hash,
			page_location: window.location.href
		});

		document.addEventListener("click", function (event) {
			var link = event.target.closest ? event.target.closest("a") : null;
			if (!link) {
				return;
			}

			pushToDataLayer("link_click", {
				link_text: trimText(link.textContent, 120),
				link_url: link.href || "",
				link_target: link.target || "_self",
				outbound: isOutboundLink(link)
			});
		});

		document.addEventListener("submit", function (event) {
			var form = event.target;
			if (!form || form.tagName !== "FORM") {
				return;
			}

			pushToDataLayer("form_submit", {
				form_id: form.id || "",
				form_name: form.getAttribute("name") || "",
				form_action: form.getAttribute("action") || window.location.href,
				form_method: (form.getAttribute("method") || "GET").toUpperCase()
			});
		});

		var videos = document.querySelectorAll("video");
		for (var i = 0; i < videos.length; i += 1) {
			videos[i].addEventListener("play", function () {
				if (this.dataset.tagTrackingPlayed === "true") {
					return;
				}

				this.dataset.tagTrackingPlayed = "true";
				pushToDataLayer("video_play", {
					video_src: this.currentSrc || this.getAttribute("src") || "",
					video_title: this.getAttribute("title") || document.title
				});
			});
		}
	}

	var hasTrackingAlready =
		Boolean(window.google_tag_manager) ||
		typeof window.gtag === "function" ||
		hasScriptMatching(/googletagmanager\.com\/gtm\.js/i) ||
		hasScriptMatching(/googletagmanager\.com\/gtag\/js/i);

	if (hasTrackingAlready) {
		return;
	}

	window.dataLayer = window.dataLayer || [];

	if (isConfigured(config.gtmId, PLACEHOLDER_GTM_ID)) {
		window.dataLayer.push({
			"gtm.start": new Date().getTime(),
			event: "gtm.js"
		});
		loadScript("https://www.googletagmanager.com/gtm.js?id=" + encodeURIComponent(config.gtmId), "gtm");
	}

	if (isConfigured(config.ga4Id, PLACEHOLDER_GA4_ID)) {
		loadScript("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(config.ga4Id), "gtag");
		window.gtag = window.gtag || function () {
			window.dataLayer.push(arguments);
		};
		window.gtag("js", new Date());
		window.gtag("config", config.ga4Id, { send_page_view: false });
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", setupPageTracking, { once: true });
	} else {
		setupPageTracking();
	}
}());
