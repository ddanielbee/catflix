app.controller('CatflixController', function($scope, $http, $timeout) {

	var second = false;
	var turn = false;
	var catUsers = [1575643421, 27467826, 375040112, 251101170, 1940507664, 732926, 
					30844342, 1505633186, 946335214, 1457036844, 13324812, 1077200406,
					1070386322, 384395068, 283525989, 1648271953, 130285, 1088083720,
					183810550, 244948960, 18183451, 1835767567,
					1700768196, 7013409, 8052122, 2064400786, 41954845, 1123374131, 
					298640322, 344502316, 191744384, 973434294, 1310998901, 199850219,
					30476224, 962856080, 646888778, 391490993, 344833058, 1017166873,
					863801202, 1181967793, 406416762, 12555533, 385051036, 10798749,
					922822457, 523526245, 476925582, 362047495, 324578250, 1529634392, 
					39187293, 361000709, 251211074, 873349408, 2114084856, 10620149, 
					1238671294, 1920879414, 529110858, 1440775683, 801187101, 1546047871, 
					1096012980, 268429181, 1348745935, 1481842968, 1312107038, 1479818392 , 1684510799 , 1639270052 , 1339924497 , 1630096423 , 889428 , 1079034833 , 1538214909 , 1658744594 , 507002007 , 1144489800 , 1332255401 , 437145920 , 1226915244 , 1364954636 , 219401009 , 1303226735 , 1643415476 , 1572551725 , 1438981677 , 478262627 , 489080263 , 801487201 , 1552812396 , 308502673 , 227974241 , 709347464 , 320936424 , 1428638223 , 754972674 , 1070546290 , 1498856090 , 628091073 , 9333759 , 271316406 , 1321926783 , 372908936 , 262984649 , 1787975272 , 202419478 , 644912146 , 1973648437 , 52728167 , 10978059 , 268071787 , 268071787 , 1452211519 , 1575992677 , 1543610248 , 1077647383 , 1481367825 , 1080496548 , 1452381543 , 777846030 , 321086011 , 241853179 , 497525083, 497525083 , 652491125 , 1450074825 , 1635672749 , 2108876572 , 363437976 , 187213235 , 1776549777 , 2103633559];

	$scope.randomize = function() {
		$http.get('/getContent').success(function(data){
	        $scope.tip = data.tip;
	        $scope.org = data.org;
	    });
	    
	    if(!second)
	    {
	    	init();
	    	secondInit();
	    	second = true;
	    } else
	    {
	    	$(".first").toggleClass("not-shown");
	    	$(".second").toggleClass("not-shown");
	    	if(!turn)
	    	{
	    		init();
	    		
	    	} else
	    	{
	    		secondInit();
	    	}
	    	turn = !turn;
	    }
	    $(".logo-img").removeClass("logo-img");
	};

	$scope.closeOverlay = function() {
		$(".overlay").addClass("opac");
		$timeout(function(){$(".overlay").addClass("hide")}, 500);
	}

	$scope.share = function() {
		FB.ui({
			method: 'feed',
	        name: "Catflix !",
	        link: "http://catflix.eledelab.co",
	        picture: "http://catflix.eledelab.co/img/catflix-cover.jpg",
	        caption: "Catflix",
	        description: "En Elede Lab nos gustan los gatos y queríamos regalarles una herramienta simple a todos los que comparten nuestro amor por los felinos: Les presentamos, Catflix."
			//method: "share", 
			//href: buildFbShare($(".lab-input").val())
		}, function(response){});
	};

	var secondInit = function() {
		var currentCat = catUsers[Math.round(Math.random()*(catUsers.length-1))];
		var userFeed = new Instafeed({
	        get: 'user',
	        userId:  currentCat,
	        accessToken: '264935597.467ede5.f8c0108f3dda41a0a52d21115dcd7bc5',
	        sortBy: 'random',
	        limit: 30,
	        mock:true,
	        resolution: 'standard_resolution',
	        success: function(data){
	        	var n = Math.round(Math.random()*10);
	        	if(data.data[n].type != "image")
	        	{
	        		secondInit();
	        	} else
	        	{
		        	$scope.secondImage = data.data[n];
		        	$scope.$apply();
	        	}
	        }
	    });
	    userFeed.run();
	};

	var init = function() {
		var currentCat = catUsers[Math.round(Math.random()*(catUsers.length-1))];
		var userFeed = new Instafeed({
		        get: 'user',
		        userId:  currentCat,
		        accessToken: '264935597.467ede5.f8c0108f3dda41a0a52d21115dcd7bc5',
		        sortBy: 'random',
		        limit: 30,
		        mock:true,
		        resolution: 'standard_resolution',
		        success: function(data){
		        	var n = Math.round(Math.random()*10);
		        	if(data.data[n].type != "image")
		        	{
		        		init();
		        	} else
		        	{
			        	$scope.image = data.data[n];
			        	$scope.$apply();
		        	}
		        }
		    });
		    userFeed.run();
	};
});