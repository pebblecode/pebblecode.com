$(document).ready(function(){
	var colors = ["#e0427b","#419fda","#adca3a", "#f7ae35", "#42b8be", "#a1579c"];                
	var rand = Math.floor(Math.random()*colors.length);           
	$('nav').css("background-color", colors[rand]);
});
