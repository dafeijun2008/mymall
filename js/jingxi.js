var app=angular.module('jingxiApp',['ionic']);
app.factory('$debounce', ['$rootScope', '$browser', '$q', '$exceptionHandler',
    function ($rootScope, $browser, $q, $exceptionHandler) {
        var deferreds = {},
            methods = {},
            uuid = 0;

        function debounce(fn, delay, invokeApply) {
            var deferred = $q.defer(),
                promise = deferred.promise,
                skipApply = (angular.isDefined(invokeApply) && !invokeApply),
                timeoutId, cleanup,
                methodId, bouncing = false;

            // check we dont have this method already registered
            angular.forEach(methods, function (value, key) {
                if (angular.equals(methods[key].fn, fn)) {
                    bouncing = true;
                    methodId = key;
                }
            });

            // not bouncing, then imgs new instance
            if (!bouncing) {
                methodId = uuid++;
                methods[methodId] = {fn: fn};
            } else {
                // clear the old timeout
                deferreds[methods[methodId].timeoutId].reject('bounced');
                $browser.defer.cancel(methods[methodId].timeoutId);
            }

            var debounced = function () {
                // actually executing? clean method bank
                delete methods[methodId];

                try {
                    deferred.resolve(fn());
                } catch (e) {
                    deferred.reject(e);
                    $exceptionHandler(e);
                }

                if (!skipApply) $rootScope.$apply();
            };

            timeoutId = $browser.defer(debounced, delay);

            // track id with method
            methods[methodId].timeoutId = timeoutId;

            cleanup = function (reason) {
                delete deferreds[promise.$$timeoutId];
            };

            promise.$$timeoutId = timeoutId;
            deferreds[timeoutId] = deferred;
            promise.then(cleanup, cleanup);

            return promise;
        }


        // similar to angular's $timeout cancel
        debounce.cancel = function (promise) {
            if (promise && promise.$$timeoutId in deferreds) {
                deferreds[promise.$$timeoutId].reject('canceled');
                return $browser.defer.cancel(promise.$$timeoutId);
            }
            return false;
        };

        return debounce;
    }
]);
//自定义服务
app.service('$customHttp', ['$http', '$ionicLoading',
    function ($http, $ionicLoading) {
        this.get = function (url, handleSucc) {
            $ionicLoading.show({
                template: 'loading...'
            });
            $http.get(url).success(function (data) {
                    $ionicLoading.hide();
                    handleSucc(data);
                })
        }
    }]);
app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider.state('home',{
        url:'/myHome',
        templateUrl:'tpl/home.html',
        controller:'homeCtrl'
    }).state('share',{
        url:'/myShare',
        templateUrl:'tpl/community.html'
    }).state('credits',{
        url:'/myCreadis',
        templateUrl:'tpl/credits.html'
    }).state('cart',{
        url:'/myCart',
        templateUrl:'tpl/cart.html',
        controller:'cartCtrl'
    }).state('own',{
        url:'/myOwn',
        templateUrl:'tpl/own.html',
        controller:'ownCtrl'
    }).state('detail',{
        url:'/myDetail/:pid',
        templateUrl:'tpl/detail.html',
        controller:'detailCtrl'
    }).state('login',{
        url:'/myLogin',
        templateUrl:'tpl/login.html',
        controller:'loginCtrl'
    }).state('order',{
        url:'/myOrder/:cartDetail',
        templateUrl:'tpl/order.html',
        controller:'orderCtrl'
    }).state('myOrder',{
        url:'/myOrder',
        templateUrl:'tpl/myOrder.html',
        controller:'myOrderCtrl'
    }).state('settings',{
        url:'/mySettings',
        templateUrl:'tpl/settings.html',
        controller:'settingsCtrl'
    }).state('register',{
        url:'/myRegister',
        templateUrl:'tpl/register.html',
        controller:'registerCtrl'
    });
    $urlRouterProvider.otherwise('/myHome');
});
app.controller('parentCtrl',['$scope','$state',
    function($scope,$state){
    $scope.jump=function(despage,arguments){
        $state.go(despage,arguments);
    };
    $scope.data={totalNumInCart:0.};
        $scope.jumpToCart=function(page){
            if(sessionStorage['uname']){
                $scope.LRuname=sessionStorage.uname;
                $state.go(page);
            }else{
                $state.go('own');
            }
        }

}]);
app.controller('homeCtrl',['$scope','$customHttp','$debounce','$ionicPopup','$ionicSideMenuDelegate',
    function($scope,$customHttp,$debounce,$ionicPopup,$ionicSideMenuDelegate){
        $scope.hasMore=true;
        $scope.inputTxt={kw:''};
        $customHttp.get('data/getbypage.php',function(data){
            //console.log(data);
            $scope.product=data;
        });
        $scope.loadMore = function () {
            $customHttp.get(
                'data/getbypage.php?start=' + $scope.product.length,
                function (data) {
                    console.log(data);
                    if (data.length < 6) {
                        $scope.hasMore = false;
                    }
                    $scope.product = $scope.product.concat(data);
                    $scope.$broadcast('scroll.infiniteScrollComplete')
                    //初始化页面所有元素 让所有元素具有触屏滚动性能
                }
            )
        };
        $scope.$watch('inputTxt.kw',function(){
            $debounce(handleSearch,300);
        });
        handleSearch=function(){
            if($scope.inputTxt.kw){
                $customHttp.get('data/getbykw.php?kw='+$scope.inputTxt.kw,function(data){
                    $scope.product=data;
                });
            }
        };
        $scope.addToCart=function(pid){
            var userId=sessionStorage['userId'];
            console.log(pid);
           if(userId){
               $customHttp.get('data/cart_detail_add.php?userId='+userId+'&productId='+pid,function(data){
                   if(data.code==1){
                       $scope.data.totalNumInCart++;
                       $ionicPopup.alert({
                           template: '添加到购物车成功！'
                       })
                   }
               });
           }
        }
        //侧边栏
        $scope.left=function(){
            $ionicSideMenuDelegate.toggleLeft();
        }
}]);
app.controller('detailCtrl',['$scope','$stateParams','$customHttp','$ionicPopup',
    function($scope,$stateParams,$customHttp,$ionicPopup){
        $customHttp.get('data/getbyid.php?pid='+$stateParams.pid,function(data){
            console.log(data[0].img1);
            $scope.product=data[0];
        });
        //$scope.addToCart=function(){
        //    $customHttp.get('data/cart_update.php?uid=1&did='+$scope.product.did,function(data){
        //
        //    })
        //};
        $scope.addToCart=function(pid){
            var userId=sessionStorage['userId'];
            console.log(pid);
            if(userId){
                $customHttp.get('data/cart_detail_add.php?userId='+userId+'&productId='+pid,function(data){
                    if(data.code==1){
                        $scope.data.totalNumInCart++;
                        $ionicPopup.alert({
                            template: '添加到购物车成功！'
                        })
                    }
                });
            }
        }
}]);
app.controller('loginCtrl',['$scope','$customHttp','$state','$ionicPopup',function($scope,$customHttp,$state,$ionicPopup){
    $scope.login={uname:'',upwd:''};
    $scope.unameBlur=function(){
        $customHttp.get('data/login_uname.php?uname='+$scope.login.uname,
            function(data){
                //console.log(data);
                $scope.unameMsg=data.msg;
            });
    };
    $scope.upwdBlur=function(){
        $customHttp.get('data/login_upwd.php?uname='+$scope.login.uname+'&upwd='+$scope.login.upwd,
            function(data){
                //console.log(data);
                $scope.upwdMsg=data.msg;
            });
        console.log($scope.login.upwd);
    };
    $scope.loginClick=function(){
        $customHttp.get('data/login.php?uname='+$scope.login.uname+'&upwd='+$scope.login.upwd,
            function(data){
                console.log(data);
                if(data.code==1){
                    sessionStorage['userId']=data.uid;
                    sessionStorage['uname']=data.uname;
                    $state.go('home');
                }
                if(sessionStorage['userId']){
                    $ionicPopup.alert({
                        template: '尊敬的用户'+sessionStorage['uname']+',您已登录!!!'
                    })
                }
            });
    };
}]);
app.controller('cartCtrl',['$scope','$customHttp',function($scope,$customHttp){
    var uid=sessionStorage['userId'];
    $scope.countPrice=0;
    $scope.cartContent=true;
    $scope.cartProduct='';
    $customHttp.get('data/cart_detail_list.php?uid='+uid,function(data){
        //console.log(data);
        $scope.cartProduct=data;
        getPrictCount(data);
        console.log($scope.cartProduct);
        if( $scope.cartProduct!=''){
            $scope.cartContent=false;
        }
    });
    $scope.deleteBtn=false;
    $scope.edit='编辑';
    $scope.editClick=function(){
        if($scope.edit=='编辑'){
            $scope.edit='完成';
            $scope.deleteBtn=true;
        }else if($scope.edit=='完成'){
            $scope.edit='编辑';
            $scope.deleteBtn=false
        }
    };
    $scope.userId=sessionStorage['userId'];
    $scope.updateClick=function(did,msg,uid,count){
        $customHttp.get('data/update_cart_detail.php?did='+did+'&msg='+msg+'&uid='+uid+'&count='+count,
            function(data){
            console.log(data);
            $scope.cartProduct=data;
            getPrictCount(data);
            console.log($scope.cartProduct)
                if( $scope.cartProduct==''){
                    $scope.cartContent=true;
                }
        });
    };
    var getPrictCount=function(data){
        $scope.countPrice=0;
        $scope.data.totalNumInCart=0;
        angular.forEach(data,function(value,index){
            //console.log(index,value.price,value.count);
            $scope.countPrice+=parseFloat(value.price)*parseFloat(value.count);
            $scope.data.totalNumInCart+=parseFloat(value.count);
        });
        return $scope.countPrice;
    };
    $scope.jumpToOrder=function(){
       var  result=angular.toJson($scope.cartProduct);
        $scope.jump('order',{cartDetail:result});
    }
}]);
app.controller('orderCtrl',['$scope','$customHttp',
    '$httpParamSerializerJQLike','$stateParams','$timeout','$state',
    function($scope,$customHttp,$httpParamSerializerJQLike,$stateParams,$timeout,$state){
        //console.log($stateParams.cartDetail);
        var totalPrice=0;
        angular.forEach(
            angular.fromJson($stateParams.cartDetail),function(value,key){
                totalPrice+=parseFloat(value.price)*parseFloat(value.count);
                //console.log(value.price);
            }
        );
        $scope.order={
            userId:sessionStorage['userId'],
            cartDetail:$stateParams.cartDetail,
            totalPrice:totalPrice
        };
        $scope.submitOrder=function(){
            //console.log($scope.order);
            var result=$httpParamSerializerJQLike($scope.order);
            $customHttp.get('data/order_add.php?'+result,function(data){
                console.log(data);
                if(data[0].msg=='succ'){
                    $scope.result='下单成功,订单编号为'+data[0].oid;
                    $scope.remindText='三秒后跳转至首页...';
                    //$scope.data.totalNumInCart=0;
                    $scope.data.totalNumInCart=0;
                    $timeout(function(){
                        $state.go('home');
                    },3000)
                }else{
                    $scope.result='下单失败!';
                }
            });
        }
    }]);
app.controller('myOrderCtrl', ['$scope', '$customHttp',
        function ($scope, $customHttp) {
            //var phone = sessionStorage.getItem('phone')
            var userId = sessionStorage['userId'];
            console.log(userId);
            $customHttp.get(
                'data/order_getbyuserid.php?userId='+userId,
                function (dataFromServer) {
                    console.log(dataFromServer);
                    $scope.orderList = dataFromServer.data;
                }
            )
        }
    ]);
app.controller('registerCtrl',['$scope','$customHttp','$state','$ionicPopup',function($scope,$customHttp,$state,$ionicPopup){
    $scope.register={uname:'',upwd:'',num:''};
    $scope.register=function(){
        $customHttp.get('data/register.php?uname='+$scope.register.uname,function(data){
           //console.log(data);
           //console.log($scope.register.uname);
            if(data.code==-1&&$scope.register.uname==undefined){
                $scope.unameMsg='请输入用户名'
            }else{
                $scope.unameMsg=data.msg;
            }
            if(data.code==-1){
                $scope.ok=1;
            }
            console.log($scope.ok);
        });
    };

    $scope.registerClick=function(){
        if(!($scope.register.upwd==undefined&&$scope.register.uname==undefined)&&$scope.ok==1){
               $customHttp.get('data/register_add_do.php?uname='+$scope.register.uname+'&upwd='+$scope.register.uname,function(data){
                   if(data.code==1){
                       sessionStorage['userId']=data.uid;
                       sessionStorage['uname']=data.uname;
                       $state.go('home');
                   }
                   console.log(data);
               });
        }
    }
}]);
app.controller('settingsCtrl',['$scope','$state',function($scope,$state){
    $scope.out=function(){
        sessionStorage['userId']='';
        sessionStorage['uname']='';
        $state.go('home');
    }
}]);
app.controller('ownCtrl',['$scope','$state',function($scope,$state){
    if(sessionStorage.uname){
        $scope.LRuname=sessionStorage.uname;
    }else{
        $scope.LRuname='登录/注册';
    }
    $scope.jumpToCart=function(page){
        if(sessionStorage['uname']){
            $scope.LRuname=sessionStorage.uname;
            $state.go(page);
        }else{
            $state.go('own');
        }
    }
}]);