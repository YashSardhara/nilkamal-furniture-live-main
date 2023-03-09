"use strict";
if(typeof window.HI == "undefined") {
	window.HI = {};
}
HI.optInCookies = {
	allowed: function() {
		return document.cookie.match(/eu-opt-in=1/);
	},
	disagreeURL: "https://www.nilkamalfurniture.com/pages/privacy-policy",
	findReadMore: function() {
		if(!HI.optInCookies.readMoreURL) {
			var scripts = document.getElementsByTagName("script");
			for(var i=0; i<scripts.length; i++) {
				if(scripts.item(i).getAttribute("read_more"))
					HI.optInCookies.readMoreURL = scripts.item(i).getAttribute("read_more");
			}
		}
		return HI.optInCookies.readMoreURL;
	},
	hideQuery: function() {
		var q = document.getElementById("hi-cookie-box");
		if(q) q.parentNode.removeChild(q);
	},
	l10n: {
		agree: "Yes, I accept",
		agreeCaption: "Yes, I accept",
		disagree: "Learn More",
		disagreeCaption: "Privacy Policy",
		queryBody: "We use cookies to personalize your experience. By continuing to visit this website you agree to our use of cookies.",
		queryTail: "",
		queryTitle: "Cookie",
		readMore: "	"
	},
	readMoreURL: undefined,
	showQuery: function() {
		var t = HI.optInCookies.topElement;
		if(document.getElementById("hi-cookie-box")) return;

		var query_outer = document.createElement("div");
		query_outer.id = "hi-cookie-box";
		
		var query_title_text = document.createElement("p");
		query_title_text.className = "hi-cookie-head";
		query_title_text.appendChild(
			document.createTextNode( HI.optInCookies.l10n.queryTitle )
		);
		query_outer.appendChild(query_title_text);

		var query_body_text = document.createElement("p");
		query_body_text.className = "hi-cookie-intro";
		var query_body_lines = HI.optInCookies.l10n.queryBody.split(/\n/);
		for(var i=0; i<query_body_lines.length; i++) {
			if(i > 0)
				query_body_text.appendChild(
					document.createElement("br")
				);
			query_body_text.appendChild(
				document.createTextNode(query_body_lines[i])
			);
		}
		query_outer.appendChild(query_body_text);

		var read_more_url = HI.optInCookies.findReadMore();
		if( read_more_url ) {
			var read_more_text = document.createElement("a");
			read_more_text.className = "read-more";
			read_more_text.target = "_blank";
			read_more_text.href = read_more_url;
			read_more_text.appendChild(
				document.createTextNode( HI.optInCookies.l10n.readMore )
			);
			var br = document.createElement("br");	
			query_body_text.appendChild(br);
			query_body_text.appendChild(br.cloneNode(false));
			query_body_text.appendChild(read_more_text);
		}

		var query_tail_text = document.createElement("p");
		query_tail_text.className = "hi-cookie-happy";
		query_tail_text.appendChild(
			document.createTextNode( HI.optInCookies.l10n.queryTail )
		);
		query_outer.appendChild(query_tail_text);

		var agree_button = document.createElement("div");
		agree_button.className = "hi-cookie-btn agree";
		agree_button.title = HI.optInCookies.l10n.agreeCaption;
		agree_button.appendChild(
			document.createTextNode( HI.optInCookies.l10n.agree )
		);
		agree_button.onclick = function() {
			var expires = new Date();
			expires.setFullYear(expires.getFullYear() + 5);
			document.cookie = "eu-opt-in=1" +
				"; path=/; expires=" + expires.toUTCString();
			HI.optInCookies.showSplash();
			if(HI.optInCookies.onAgree) HI.optInCookies.onAgree();
		};
		query_outer.appendChild(agree_button);

		var disagree_button = document.createElement("div");
		disagree_button.className = "hi-cookie-btn disagree";
		disagree_button.title = HI.optInCookies.l10n.disagreeCaption;
		disagree_button.appendChild(
			document.createTextNode( HI.optInCookies.l10n.disagree )
		);
		disagree_button.onclick = function() {
			location.href = HI.optInCookies.disagreeURL;
		};
		query_outer.appendChild(disagree_button);

		var spacer = document.createElement("div");
		spacer.style.clear = "both";
		query_outer.appendChild(spacer);
		
		var acknowledgement = document.createElement("p");
		acknowledgement.className = "hi-cookie-power";
		acknowledgement.innerHTML =
			'Powered by<br /><a href="http://www.heartinternet.co.uk/" rel="nofollow" title="Web Hosting">Heart Internet</a>'

		query_outer.appendChild(acknowledgement);
		
		t.appendChild(query_outer);
	},
	showSplash: function() {
		if(HI.optInCookies.topElement) {
			var t = HI.optInCookies.topElement;
			t.parentNode.removeChild(t);
		}
		var t = document.createElement("div");
		t.id = "hi-eu-opt-in";
		document.body.appendChild(t);
		HI.optInCookies.topElement = t;
		if( HI.optInCookies.allowed() ) {
			var d = document.createElement("div");
			d.className = "opt-in-splash confirmed";
			t.appendChild(d);
		} else {
			var d = document.createElement("div");
			d.className = "opt-in-splash unconfirmed";
			d.onclick = HI.optInCookies.showQuery;
			t.appendChild(d);
			setTimeout(HI.optInCookies.showQuery, 500);
		}
	},
	topElement: ""
};
