$(function(){
    //변수
    const body = $('body');
    const chStart = $('#BI');
    const svg = $('h1 svg');
    const movie = $('#movie video');
    const hidden = $('.hidden');
    const hamenu = $('.hamenu');
    const contact = $('.contact');
    const contacBtn = $('.contacBtn');
    const hSiteMap = $('.h-sitemap');

    const sct4 = (chStart.offset().top)-600; // sec2 BI부터 적용할 sct값
    const sct2 = 180; // sec h1에 적용할 sct값 ,  nav 요소에 적용할 sct값

    //scroll 함수시작
    $(window).scroll(()=> {
        let sct = $(window).scrollTop();
        console.log(sct);
        //sitemap, contact
        let navFix = sct > sct2;
        $('.contact, .hamenu').toggleClass('fix', navFix);

        //h1
        let headFix = sct > 150;
        $('h1').toggleClass('fix', headFix);
        //h1의 크기 변화
        if(sct > 0 && sct < 400 ) {
            svg.css({width:`${100-sct/10*2.3}%`, height:`${100-sct/10*2.3}%`});
        }
        //sct400이상에서 h1의 크기변화 유지
        if(sct>=400){
            svg.css({width:`${100-400/10*2.3}%`, height:`${100-400/10*2.3}%`});
        }

        //.scroll
        sct >= 100 ? $('.scroll').css('opacity','0') : $('.scroll').css('opacity','1');

        //body backgroundColor 변화
        sct > 800 ? body.css('backgroundColor', '#f6f6f6') : body.css('backgroundColor', '#1d1d1d');
        //contact backgroundColor 변화 
        sct > 1300 ? contact.css('backgroundColor','#fff') : contact.css('backgroundColor','rgba(255,255,255,0.5)');
        //body color 변화
        let scrolled = sct > sct4;
        body.toggleClass('bgch', scrolled);

        //footer에서 nav, h1,contact감추기
        sct >= 9550 ? $('.contact, .hamenu, h1').fadeOut(300) : $('.contact, .hamenu, h1').fadeIn(300);


        //BI text 순서대로 나타나기
        const animatedText = document.querySelectorAll('.BI-text .up');
        if (600 < sct) {
            animatedText.forEach((text, i) =>
              setTimeout(() => text.classList.add('upText'), 50 * i)
            );
          } else if (1320 > sct) {
            animatedText.forEach((text, i) => text.classList.remove('upText'));
          }

        //media content들 sct에 따라 나타나기
        sct > 2700 ? $('.media01').addClass('on') : $('.media01').removeClass('on');
        sct > 3100 ? $('.media02').addClass('on') : $('.media02').removeClass('on');
        sct > 3600 ? $('.media03').addClass('on') : $('.media03').removeClass('on');
        sct > 3900 ? $('.media04').addClass('on') : $('.media04').removeClass('on');
        sct > 4400 ? $('.media05').addClass('on') : $('.media05').removeClass('on');
        sct > 4600 ? $('.media06').addClass('on') : $('.media06').removeClass('on');
        sct > 5300 ? $('.media07').addClass('on') : $('.media07').removeClass('on');
        sct > 6600 ? $('.media08').addClass('on') : $('.media08').removeClass('on');

        //sct에 따라 h2, .pro-text-up의 span 나타나기
        //h2
        sct > 1000 ? $('.our-ser').addClass('on') : $('.our-ser').removeClass('on');
        sct > 2300 ? $('.our-pro').addClass('on') : $('.our-pro').removeClass('on');
        sct > 7700 ? $('.our-cli').addClass('on') : $('.our-cli').removeClass('on');
        //span
        sct > 3200 ? $('.pro-up01').addClass('on') : $('.pro-up01').removeClass('on');
        sct > 4000 ? $('.pro-up02').addClass('on') : $('.pro-up02').removeClass('on');
        sct > 4900 ? $('.pro-up03').addClass('on') : $('.pro-up03').removeClass('on');
        sct > 6200 ? $('.pro-up04').addClass('on') : $('.pro-up04').removeClass('on');
        sct > 7100 ? $('.pro-up05').addClass('on') : $('.pro-up05').removeClass('on');
        //footer span
        sct > 9280 ? $('.f-up-text').addClass('on'): $('.f-up-text').removeClass('on');
    });
    //scroll 함수 끝

    //----------------section movie
    //video 사이즈 변화
    $(window).on('mousewheel',function(e){
        let sct = $(window).scrollTop();
        let movW = movie.css('width');
        if( sct > 0 && sct < 600) {
            let wheel = e.originalEvent.wheelDelta;
            if(wheel>0){    //스크롤 올릴때
            movie.css('width',`${parseInt(movW)-38}px`);
            } else {    //스크롤 내릴때
            movie.css('width',`${parseInt(movW)+38}px`);
            }
        }
    });
    //------------------hamenu
    hamenu.on('click',() => {
        hSiteMap.toggle(300);
        hamenu.toggleClass('on');
    })

    //-------------------contact
    const chText = $('.con-chText .chText');
    const upText = document.querySelectorAll('.con-chText .chText .up');
    //chText div의 display상태를 변화
    function showTextDiv(num){
        chText.hide();
        upText.forEach((text, i) => {text.classList.remove('upText')});
        chText.eq(num).show();
        upText.forEach((text, i) => {
        setTimeout(() => text.classList.add('upText'), 50 * i)});
    }
    contact.on('mouseenter',() => {
        //contact는 사라지고 hidden이 나타남
        contacBtn.fadeOut(300);
        hidden.show(300);
        upText.forEach((text, i) => {
            setTimeout(() => text.classList.add('upText'), 50 * i)});
        //chText 내용 4초 간격으로 변화
        let divNum=1;
        chLoop = setInterval(()=>{
            showTextDiv(divNum);
            divNum == 2 ? divNum = 0 : divNum++;
            hidden.css('transition','0.5s');
            //backgrondColor 변경
            if(chText.eq(0).css('display') != 'none') {
                hidden.css('backgroundColor','#1188ff');
            }else if(chText.eq(1).css('display') != 'none') {
                hidden.css('backgroundColor','#F35C4A');
            }else {
                hidden.css('backgroundColor','#60f2d0');
            }
        },4000);
    });
    contact.on('mouseleave',() => {
        $('.contacBtn').fadeIn(300);
        hidden.hide(300);
        clearInterval(chLoop);
        chText.eq(0).css('display','block');
        chText.eq(1).css('display','none');
        chText.eq(2).css('display','none');
        hidden.css({'backgroundColor':'#1188ff','transition':'none'});
    });
    
    
    //---------------section Services
    let boxArr = [];
    const serBox = $('#Services .box');
    for(let i=0; i<4; i++){
        let heighta = serBox.eq(i).css('height')
        boxArr.push(parseInt(heighta));
    }
    //호버시 box의 자기높이+200px만큼 증가
    serBox.hover(function() {
        let numHeight = boxArr[$(this).index()];
        $(this).css('height',`${numHeight+200}px`);
    },function() {
        let numHeight = boxArr[$(this).index()];
        $(this).css('height',numHeight);
    })

    //-------------section Clients
    //이미지 갯수만큼 슬라이드 li삽입
    let imgs = "";
    for(let i=0; i<30; i++){ //폴더의 파일갯수는 php,Node.js로만 획득 가능
        imgs += `<div><img src="imgs/slider/slider${i}.png"></div>`;
    }
    $('.slider').html(imgs);

    //slick jQuery
    $('.slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: false,
        infinite: false,
        speed: 300,
        centerMode: false,
        variableWidth: false,
    });
    

    //---------------footer
    //footer 문구 변화
    //chText div의 display상태를 변화
    const footerChText = $('footer .chText');
    const footerUpText = document.querySelectorAll('footer .chText .up');
    const footer = $('footer');
    const fChText = $('.f-chText');
    footerUpText.forEach((text, i) => {
        setTimeout(() => text.classList.add('upText'), 50 * i)});
    function showFooterTextDiv(num){
        footerChText.hide();
        footerUpText.forEach((text, i) => {text.classList.remove('upText')});
        footerChText.eq(num).show();
        footerUpText.forEach((text, i) => {
            setTimeout(() => text.classList.add('upText'), 50 * i)});
    }
    let divNum=1;
    chLoop = setInterval(()=>{
        showFooterTextDiv(divNum);
        divNum == 2 ? divNum = 0 : divNum++;
        //backgrondColor 변경
        if(footerChText.eq(0).css('display') != 'none') {
            footer.css('backgroundColor','#1188ff');
        }else if(footerChText.eq(1).css('display') != 'none' ) {
            footer.css('backgroundColor','#F35C4A');
            fChText.css('width','60%');
        }else {
            footer.css('backgroundColor','#60f2d0');
            fChText.css('width','50%');
        }
    },4000);
}); //window Ready끝





