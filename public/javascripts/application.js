$(document).ready(function(){
	var colors = ["#e0427b","#419fda","#adca3a", "#f7ae35", "#42b8be", "#a1579c"];                
	var rand = Math.floor(Math.random()*colors.length);           
	$('nav').css("background-color", colors[rand]);
	$('a[href*=work/#]').click(function() {

		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
			&& location.hostname == this.hostname) {

			var $target = $(this.hash);

			$target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');

			if ($target.length) {

				var targetOffset = $target.offset().top - 300;

				$('html,body').animate({scrollTop: targetOffset}, 10);

				return false;

			}

		}

	});
});
