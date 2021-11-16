var thetastable = thetastable || {};
var $body = $("body"),
    $wrap = $(".wrap"),
    $header = $(".header"),
    $btnBurger = $(".btn_burger"),
    $mainWrap = $(".main_wrap"),
    $sect = $mainWrap.find(".sect"),
    $rightSect = $(".right_sect"),
    sectInnerH = $sect.innerHeight(),
    sectLng = $sect.length,
    footH = $(".footer").innerHeight(),
    $businessLi = $sect.find(".area_business").find("li"),
    $btnTop = $(".btn_top"),
    i = 0,
    isWheel = true;

// $(document).ready(function(){
//     $("#header").load("/thetastable/include/header.html")    
//     $("#footer").load("/thetastable/include/footer.html")    
// });
    
thetastable = {
    common : function(){
        // gnb 모션
        var gnb = function(){
            var $gnb = $header.find("#gnb"),
                $depthWrap = $gnb.find(".depth_wrap"),
                $depth1 = $gnb.find(".depth1"),
                $depth2Wrap = $gnb.find(".depth2_wrap"),
                $allGnbWrap = $(".all_gnb").find("ul"),
                $allList = $allGnbWrap.find(".depth_wrap");
            
            // gnb mouse enter motion
            $gnb.on("mouseenter",function(){
                if(!$wrap.is(".open")){
                    $header.addClass("on");
                    $depth2Wrap.css("display","block");
                    setTimeout(function(){
                        $depth2Wrap.stop().animate({
                            "marginTop":"0px",
                            "opacity":"1"
                        },300);
                    },200);
                };
            })
            // gnb mouse leave motion
            $header.on("mouseleave",function(){
                if(!$wrap.is(".open")){
                    $depth2Wrap.stop().animate({
                        "opacity":"0",
                        "margin-top":"20px"
                    },100);
                    
                    $depth2Wrap.css("display","none");
                    $header.removeClass("on");
                };
            });
            // toggle class to each section for motion
            $depthWrap.each(function(i,target){
                if(!$wrap.is(".open")){
                    $depthWrap.on("mouseenter",function(){
                        $(target).find(".depth1").removeClass("active");
                        $(this).find(".depth1").addClass("active");
                    }).on("mouseleave",function(){
                        $(target).find(".depth1").removeClass("active");
                    });
                };
            });
            // burger menu
            $btnBurger.on("click",function(){
                $wrap.toggleClass("open");
                $("#allMenu").css("display","block");

                if($wrap.is(".open") && $header.is(".on")){
                    $header.removeClass("on");
                    $depth2Wrap.stop().animate({
                        "opacity":"0",
                        "margin-top":"20px"
                    },100);
                    $depth2Wrap.css("display","none");
                }

                if(!$wrap.is(".open")){
                    setTimeout(function(){
                        $("#allMenu").css("display","none");
                    },800);
                }
                setTimeout(function(){
                    $header.toggleClass("all");
                    $rightSect.toggleClass("all_sect");
                },500);
        
                if(i >= 2){
                    if($(".wrap").is(".all")){
                        $(".wrap").removeClass("black");
                    }
                }
            })
            // all menu 클릭시 리스트 모션
            $allList.each(function(i,list){
                $(list).find(".depth1").on("click",function(){
                    $(this).closest(list).toggleClass("on").siblings().removeClass("on");
        
                    if($(this).closest(list).is(".on")){
                        $(this).siblings(".depth2_wrap").slideDown(500);
                        $(this).siblings(".depth2_wrap").animate({
                            "opacity":"1"
                        },600,"linear");
                    }else{
                        $(this).siblings(".depth2_wrap").animate({
                            "opacity":"0"
                        },600,"linear");
                        $(this).siblings(".depth2_wrap").slideUp(500);
                    }
                    
                    if(!$(this).closest(list).siblings().is(".on")){
                        $(this).closest(list).siblings().find(".depth2_wrap").slideUp();
                        $(this).closest(list).siblings().find(".depth2_wrap").animate({
                            "opacity":"0"
                        },600,"linear");
                    }
                })
            })
        }();
        // family site 마우스 엔터 모션
        var family = function(){
            var $familySite = $(".family_site"),
                $familyBtn = $familySite.find("button"),
                $familyList = $familySite.find("li");
        
            $familyBtn.on("mouseenter",function(enter){
                $familySite.addClass("on");
                $familySite.find("ul").show();
                famAnimate(enter);
            })
            $familySite.on("mouseleave",function(leave){
                $(this).removeClass("on");
                $familySite.find("ul").hide();
                famAnimate(leave);
            })
        
            function famAnimate(mouseE){
                var eType = mouseE.type;
        
                if(eType == "mouseenter"){
                    $familyList.each(function(idx,key){
                        $(key).stop().animate({
                            "marginLeft":"0"
                        },{
                            duration: 100 * idx,
                            complete: function () {
                                $(key).css("opacity","1");
                            }
                        });
                    })
                }else{
                    $familyList.stop().animate({
                        "marginLeft":"20px"
                    },{
                        duration: 100,
                        complete: function () {
                            $familyList.css("opacity","0");
                        }
                    });
                }
            }
        }();
        // brand list 슬라이드 모션
        var slide = function(){
            var $brandWrap = $(".brand_wrap"),
                $list = $brandWrap.find(".brand_list"),
                $brand = $list.find(".brand"),
                $btn = $brandWrap.find(".btn"),
                cnt = 0;
        
            $btn.each(function(i,key){
                $(key).on("click",function(){
                    if($(key).is(".btn_prev")){
                        if(cnt > 0){
                            cnt--;
                        }
                    }else{
                        if(cnt < $brand.length / 2){
                            cnt++;
                        }
                    }
                    sliding();
                })
            })
            
            function sliding(){
                $brand.each(function(idx,target){
                    var $brandWidth = $brand.width(),
                        margin35 = Number(35);
        
                    $list.css("left",(-($brandWidth + margin35) * cnt));
                })
            }
        }();
    },

    // 마우스 휠 이벤트 top값
    top : function(){
        var mousewheel = function(){
        var $indiWrap = $(".indigater").find("ul"),
            $indigater = $indiWrap.find("li");

            $body.on("mousewheel",function(e){
                var event = e.originalEvent;

                if(isWheel){
                    if(event.wheelDeltaY < 0 || event.wheelDelta < 0){ //스크롤이 내려갈때
                        if(i < sectLng){ 
                            i++;
                        }
                    }else{//스크롤이 올라갈때
                        if(i > 0) { 
                            i--;
                        }
                    }
                    mainMove(i);
                    sectAnimate(i);
                }
            })

            $indigater.each(function(indxx,btn){
                $(btn).find("a").on("click",function(){
                    i = indxx;                
                    
                    mainMove(i);
                    sectAnimate(i);
                })
            })

            function mainMove(i){
                $sect.removeClass("active");
                $sect.eq(i).addClass("active");
                
                isWheel = false;

                $mainWrap.stop().animate({"top" : -(sectInnerH * i) + "px"},100,"linear",function(){
                    setTimeout(function(){
                        isWheel = true;
                    },700);
                });
                $header.removeClass("hidden");

                if(i == sectLng){
                    $mainWrap.stop().animate({"top" : -(sectInnerH * (i - 1)) + -(footH) + "px"},50,"linear",function(){
                        setTimeout(function(){
                            isWheel = true;
                        },700);
                    });
                    $header.addClass("hidden");
                }
                                
                topBtn(i);
                sectAnimate(i);
            }

            function topBtn(topI){
                $btnTop.on("click",function(){
                    i = 0;
                    $mainWrap.stop().animate({"top": i},100,"linear");

                    mainMove(i);
                    sectAnimate(i);
                })
            }

            function sectAnimate(i){
                var $rightSect = $(".right_sect");
                
                $indigater.removeClass("active");
                $indigater.eq(i).addClass("active");

                if($sect.eq(i).hasClass("active")){
                    if(i == 1){
                        setTimeout(function(){
                            $businessLi.find(".bg").stop().animate({
                                "width":"100%"
                            },300,"linear");

                            $businessLi.find(".txt_front").stop().animate({
                                opacity:1,
                                marginTop:0
                            },500,"swing",function(){})
                        },800);
                    }
                    if(i == 2){
                        var $num = $(".num");
                        setTimeout(function(){
                            $num.each(function(numIdx,target){
                            var number = $(target).data("number"),
                                speed = 600;
                            
                            if(numIdx == 0){
                                speed = 300;
                            }

                            $({ val: 0 }).stop().animate({ val: number }, {
                                    duration: speed,
                                    step: function (now) {
                                        var newVal = Math.floor(this.val) + 1;
                                        
                                        $(target).text(newVal);
                                    }
                                })
                            })
                        },1000);
                    }

                    if(i >= 2){
                        if(!$(".wrap").is(".all")){
                            $(".wrap").addClass("black");
                        }
                    }else{
                        $(".wrap").removeClass("black");
                    }

                    if(i >= 4){
                        $rightSect.find(".scroll").css('opacity','0');
                        $rightSect.find($btnTop).stop().animate({
                            "opacity":"1",
                            "bottom":"60px"
                        },500,"swing");

                    }else{
                        $rightSect.find(".scroll").css('opacity','1');
                        $rightSect.find($btnTop).stop().animate({
                            "bottom":"0px",
                            "opacity":"0"
                        },500,"swing");
                    }
                }
            }
        }();
    },
    // 마우스 휠 이벤트 transform
    transform : function(){
        var mousewheel = function(){
            var $indiWrap = $(".indigater").find("ul"),
                $indigater = $indiWrap.find("li");
    
                $body.on("mousewheel",function(e){
                    var event = e.originalEvent;
    
                    if(isWheel){
                        if(event.wheelDeltaY < 0 || event.wheelDelta < 0){ //스크롤이 내려갈때
                            if(i < sectLng){ 
                                i++;
                            }
                        }else{//스크롤이 올라갈때
                            if(i > 0) { 
                                i--;
                            }
                        }
                        mainMove(i);
                        sectAnimate(i);
                    }
                })
    
                $indigater.each(function(indxx,btn){
                    $(btn).find("a").on("click",function(){
                        i = indxx;                
                        
                        mainMove(i);
                        sectAnimate(i);
                    })
                })
    
                function mainMove(i){
                    $sect.removeClass("active");
                    $sect.eq(i).addClass("active");
                    
                    isWheel = false;
    
                    $mainWrap.css(
                        {transform : "translateY("+ -(sectInnerH * i) +"px)"}
                    )

                    setTimeout(function(){
                        isWheel = true;
                    },700);

                    $header.removeClass("hidden");

                    if(i == sectLng){
                        $mainWrap.css({transform : "translateY("+ -((sectInnerH * (i - 1)) + (footH)) +"px)"})
                      
                        setTimeout(function(){
                            isWheel = true;
                        },700);
                        $header.addClass("hidden");
                    }
                    topBtn(i);
                    sectAnimate(i);
                }
    
                function topBtn(topI){
                    $btnTop.on("click",function(){
                        i = 0;
                        $mainWrap.stop().animate({"top": i},100,"linear");
    
                        mainMove(i);
                        sectAnimate(i);
                    })
                }
    
                function sectAnimate(i){
                    var $rightSect = $(".right_sect");
                    
                    $indigater.removeClass("active");
                    $indigater.eq(i).addClass("active");
    
                    if($sect.eq(i).hasClass("active")){
                        if(i == 1){
                            setTimeout(function(){
                                $businessLi.find(".bg").stop().animate({
                                    "width":"100%"
                                },300,"linear");
    
                                $businessLi.find(".txt_front").stop().animate({
                                    opacity:1,
                                    marginTop:0
                                },500,"swing",function(){})
                            },800);
                        }
                        if(i == 2){
                            var $num = $(".num");
                            setTimeout(function(){
                                $num.each(function(numIdx,target){
                                var number = $(target).data("number"),
                                    speed = 600;
                                
                                if(numIdx == 0){
                                    speed = 300;
                                }
    
                                $({ val: 0 }).stop().animate({ val: number }, {
                                        duration: speed,
                                        step: function (now) {
                                            var newVal = Math.floor(this.val) + 1;
                                            
                                            $(target).text(newVal);
                                        }
                                    })
                                })
                            },1000);
                        }
    
                        if(i >= 2){
                            if(!$(".wrap").is(".all")){
                                $(".wrap").addClass("black");
                            }
                        }else{
                            $(".wrap").removeClass("black");
                        }
    
                        if(i >= 4){
                            $rightSect.find(".scroll").css('opacity','0');
                            $rightSect.find($btnTop).stop().animate({
                                "opacity":"1",
                                "bottom":"60px"
                            },500,"swing");
    
                        }else{
                            $rightSect.find(".scroll").css('opacity','1');
                            $rightSect.find($btnTop).stop().animate({
                                "bottom":"0px",
                                "opacity":"0"
                            },500,"swing");
                        }
                    }
                }
            }();
    },
    // 마우스 휠 이벤트 tweenMax
    tween : function(){
        var mousewheel = function(){
            var $indiWrap = $(".indigater").find("ul"),
                $indigater = $indiWrap.find("li");
    
            $body.on("mousewheel",function(e){
                var event = e.originalEvent;

                if(isWheel){
                    if(event.wheelDeltaY < 0 || event.wheelDelta < 0){ //스크롤이 내려갈때
                        if(i < sectLng){ 
                            i++;
                        }
                    }else{//스크롤이 올라갈때
                        if(i > 0) { 
                            i--;
                        }
                    }
                    mainMove(i);
                    sectAnimate(i);
                }
            })

            $indigater.each(function(indxx,btn){
                $(btn).find("a").on("click",function(){
                    i = indxx;                
                    
                    mainMove(i);
                    sectAnimate(i);
                })
            })

            function mainMove(i){

                $sect.removeClass("active");
                $sect.eq(i).addClass("active");
                
                isWheel = false;

                TweenMax.to($mainWrap, 0.3, {top:-(sectInnerH * i), onComplete:function(){
                    setTimeout(function(){
                        isWheel = true;
                    },800);
                }});
                $header.removeClass("hidden");

                if(i == sectLng){
                    TweenMax.to($mainWrap, 0.2, {top:-(sectInnerH * (i - 1)) + -(footH), onComplete:function(){
                        setTimeout(function(){
                            isWheel = true;
                        },500);
                    }});
                    $header.addClass("hidden");
                }
                
                topBtn(i);
                sectAnimate(i);
            }

            function topBtn(topI){
                $btnTop.on("click",function(){
                    i = 0;
                    $mainWrap.stop().animate({"top": i},100,"linear");

                    mainMove(i);
                    sectAnimate(i);
                })
            }

            function sectAnimate(i){
                var $rightSect = $(".right_sect");
                
                $indigater.removeClass("active");
                $indigater.eq(i).addClass("active");

                if($sect.eq(i).hasClass("active")){
                    if(i == 1){
                        setTimeout(function(){
                            $businessLi.find(".bg").stop().animate({
                                "width":"100%"
                            },300,"linear");

                            $businessLi.find(".txt_front").stop().animate({
                                opacity:1,
                                marginTop:0
                            },500,"swing",function(){})
                        },800);
                    }
                    if(i == 2){
                        var $num = $(".num");
                        setTimeout(function(){
                            $num.each(function(numIdx,target){
                            var number = $(target).data("number"),
                                speed = 600;
                            
                            if(numIdx == 0){
                                speed = 300;
                            }

                            $({ val: 0 }).stop().animate({ val: number }, {
                                    duration: speed,
                                    step: function (now) {
                                        var newVal = Math.floor(this.val) + 1;
                                        
                                        $(target).text(newVal);
                                    }
                                })
                            })
                        },1000);
                    }

                    if(i >= 2){
                        if(!$(".wrap").is(".all")){
                            $(".wrap").addClass("black");
                        }
                    }else{
                        $(".wrap").removeClass("black");
                    }

                    if(i >= 4){
                        $rightSect.find(".scroll").css('opacity','0');
                        $rightSect.find($btnTop).stop().animate({
                            "opacity":"1",
                            "bottom":"60px"
                        },500,"swing");

                    }else{
                        $rightSect.find(".scroll").css('opacity','1');
                        $rightSect.find($btnTop).stop().animate({
                            "bottom":"0px",
                            "opacity":"0"
                        },500,"swing");
                    }
                }
            }
        }();
    }
}

thetastable.common();
