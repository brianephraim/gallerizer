require(['module2'], function(){
	require(['module2'], function(x){//THIS IS THE SECOND TIME module2 HAS BEEN REQUIRED, BUT ITS BOILERPLATE ONLY FIRE'S ONCE.  IT'S EFFICIENT.
		console.log(new x().getModule1Name())
	});
});