
function Lightbox(options) {
	this.images = options.images;
	this.id = "lb-"+new Date().getTime();	
	this.state = 'hidden';
	this.selectedImage = 0;
	var lb = this;
	setTimeout(function() {lb.preload();}, 500);
	var div= $('<div id="'+this.id+'"><img src="'+this.images[0]+'" id="'+this.id+'-pic"><img src="lb-left.png" id="'+this.id+'-left"/><img src="lb-right.png" id="'+this.id+'-right"/></div>');
	div.css("display", " none");
	div.css("position", " absolute");
	div.css("top", "0%");
	div.css("left", "0%");
	div.css("padding", "0px");
	div.css("border", "10px solid #fff");
	div.css("background-color", " #000000");
	div.css("z-index", "1002");
	div.css("overflow", " hidden");
	div.css("-moz-border-radius", " 5px"); 
	div.css("-webkit-border-radius", " 5px"); 
	$("body").append(div); 

	var overlay = $("<div></div");
	
	overlay.css("display", "none");
	overlay.css("position", "absolute");
	overlay.css("top", " 0%");
	overlay.css("left", " 0%");
	overlay.css("width", " 100%");
	overlay.css("height", " 100%");
	overlay.css("background-color", "black");
	overlay.css("z-index", "1001");
	overlay.css("-moz-opacity", " 0.8");
	overlay.css("opacity", ".80");
	overlay.css("filter", "alpha(opacity=80)");	
	
	$("body").append(overlay);
	this.overlay = overlay;
	
	$(document).click(function() {
		
		if(lb.state == 'visible') {
			lb.hide();
		}
	});
	$(window).resize(function() {lb.updateCss();});
	$(document).keydown(function(event) {
		if (lb.state != 'hidden') {
			if (event.keyCode == 27) {
				lb.hide();
			} else if (event.keyCode == 37) {
				lb.prev();
			} else if (event.keyCode == 39) {
				lb.next();	
			}
		}	
	});
	this.updateCss();
}

Lightbox.prototype.hide = function() {
	this.overlay.fadeOut();
	$("#"+this.id).fadeOut();
	this.state = 'hidden';	
}

Lightbox.prototype.updateCss = function() {
	var light = $("#"+this.id), rightButton = $("#"+this.id+"-right"), leftButton = $("#"+this.id+"-left");
	light.css("left", (document.width / 2) - (light.width()/2));
	light.css("top", 20);
	var y = (light.height()-100);
	leftButton.css("left", 20);
	leftButton.css("top",y);
	leftButton.css("position", "absolute");
	leftButton.css("z-index","1003");

	rightButton.css("left", light.width()-105);
	rightButton.css("top",y);
	rightButton.css("position", "absolute");
	rightButton.css("z-index","1003");
}

Lightbox.prototype.preload = function() {
	var html='<div>';
	for (var i = 0; i< this.images.length; i++) {
		html += '<img src="'+this.images[i]+'" width="0" height="0"/>';
	}
	html += '</div>';
	var preloader = $(html);
	preloader.css("position", "absolute");;
	preloader.css("top", "-100px");
	preloader.css("left", "-100px");
	preloader.css("width","0px");
	preloader.css("height","0px");
	$("body").append(preloader);	
}

Lightbox.prototype.prev = function() {
	this.selectedImage = this.selectedImage-1;
	this.selectedImage = this.selectedImage < 0 ? this.images.length+this.selectedImage : this.selectedImage;
	var pic = $("#"+this.id+"-pic"), lb = this;
	pic.fadeOut(function() {
		pic.attr("src",lb.images[lb.selectedImage]);
		pic.fadeIn();
	});
	
}

Lightbox.prototype.next = function() {
	this.selectedImage = (this.selectedImage+1) % this.images.length;
	var pic = $("#"+this.id+"-pic"), lb = this;
	pic.fadeOut(function() {
		pic.attr("src",lb.images[lb.selectedImage]);
		pic.fadeIn();
	});
}

Lightbox.prototype.open = function() {
	event.stopPropagation();
	
	this.overlay.fadeIn();
						
	this.state = 'visible';

	var light = $("#"+this.id), rightButton = $("#"+this.id+"-right"), leftButton = $("#"+this.id+"-left");
	var lb = this;
	
	this.updateCss();

	rightButton.css("display", "none");
	leftButton.css("display", "none");
	light.css("display", "block");

	
	light.click(function() {event.stopPropagation();});
	
	leftButton.click(function() {
		event.stopPropagation();
		lb.prev();
	});
	
	rightButton.click(function() {
		event.stopPropagation();
		lb.next();
	});


	this.state = 'hidden';
	this.lastMove = new Date().getTime();

	
	$("#"+lb.id+"-pic").mousemove(function(event) {
		var now = new Date().getTime();
		switch (lb.state) {
		case 'hidden':

			if (event.pageX < document.width/2) {
				lb.state = 'left';
				leftButton.fadeIn();
			}

			if (event.pageX > document.width/2) {
				lb.state = 'right';
				rightButton.fadeIn();
			}

			break;

		case 'left':
			if (!(event.pageX < document.width/2)) {
				lb.state = 'hidden';
				leftButton.fadeOut();
			}
			break;

		case 'right':
			if (!(event.pageX > document.width/2)) {
				lb.state = 'hidden';
				rightButton.fadeOut();
			}
			break;
		}

		window.lastMove = now;
	});	
}