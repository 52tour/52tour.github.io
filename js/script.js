function $Send2Server(obj, backfunk){
	$.ajax({
		url:'srv.php'
		, async: true
		, type:'POST'
		, data:'Tour=' + (JSON.stringify(obj)).split('&').join('__and__') /* иначе крах по & */
		, success: function(obj) {
			if(obj.error){
				alert(" ошибка:\n" + obj.error);
			} else {
				backfunk(obj);
			}
		  }
	});
};
window.onpopstate = function(e){
    console.log(e.state);
	var n = e.state;
    if(n==null) n="0";
    if(n==undefined) n="0";
    g("g,"+n, $("#sun")[0],false);
};
function g(command,where,history_push){
if(history_push == undefined) history_push = true;
	if(where==undefined) {
		//console.log("Get not found where");
		return;
	}
	$(where).html( "<p><img src=\"no.gif\"></p>" );
	gObj = {};
	gObj['command'] = command;
	//if(command.substr(0,5)=="hot_s") $("#sun").addClass("content"); 
	$Send2Server(gObj, function(gObj){
		if(gObj['response']==undefined) gObj['response']="уточните в нашем турагентстве";
		$(where).html( gObj['response'] );
		
		if(gObj['title'] != undefined) {
			document.title = gObj['title'];
			$('meta[name="description"]').attr('content',gObj['description']);
			switch (gObj['type'])
			{
				case "1":
					$("#bhg-content").addClass("bhg-content");
					$("#sun").removeClass("content100");
					$("#sun").addClass("content");
					$("#bhg-action").fadeIn();
					$("#bhg-menu").fadeIn();
					break;
				case "2":
					$("#bhg-content").removeClass("bhg-content");
					$("#sun").removeClass("content");
					$("#sun").addClass("content100");
					$("#bhg-action").hide();
					$("#bhg-menu").hide();
					g('aviabilet',$('#aviabilety')[0]);
					break;
				case "3":
					$("#bhg-content").addClass("bhg-content");
					$("#sun").removeClass("content100");
					$("#sun").removeClass("content");
					$("#bhg-action").fadeIn();
					$("#bhg-menu").fadeIn();
					break;
				default:
					$("#sun").addClass("content");
					$("#bhg-action").fadeIn();
					$("#bhg-menu").fadeIn();
					
					break;
			}
			myonload();
			if(history_push) window.history.pushState(gObj['url'], gObj['title'], "/?n="+gObj['url']);
		};
	});
};

function Slider(obj, period){
	if(obj==undefined) {
		//console.log("Slider not found obj for "+imgs);
		return;
	}
	this.obj = obj;
	this.imgs = obj.getElementsByTagName("div");
	this.i = 0;
	this.period = period;
	this.mask = false;
	
	this.show = function(){
		this.imgs[this.i].style.display="block";
	};
	this.hide = function(){
		this.imgs[this.i].style.display="none";
	};
	
	this.go = function(thisis){
		if(!thisis.mask){
			thisis.hide();
			thisis.i++;
			if(thisis.i>=thisis.imgs.length) thisis.i=0;
			thisis.show();
		} else {
			thisis.mask = false;
		}
		setTimeout(thisis.go,thisis.period,thisis);
	};
	this.back = function (){
		this.mask = true;
		this.hide();
		this.i--;
		if(this.i<0) this.i=this.imgs.length-1;
		this.show();
	}
	this.forward = function (){
		this.mask = true;
		this.hide();
		this.i++;
		if(this.i==this.imgs.length) this.i=0;
		this.show();
	}
	this.show();
	setTimeout(this.go,this.period,this);
};

myonload = function(){
/*
	if( $("#sun")[0] != undefined ){
	$("a").each(function() {
		if($(this).attr("href") != undefined ){
		if($(this).attr("href").indexOf("#") == -1 ){
	    var what = $(this).attr("href").split('?n='); //simply filter
		if(what.length == 2){
			$(this).click(function() {
				g('g,'+what[1],$("#sun")[0]);
			});
			$(this).attr("href","javascript:void(0)");//$(this).removeAttr("href");
		};
		};
		};
	});
	//return;
	};
*/
/*    g("hot_a",$("#hot_a")[0]);
    g('hot_b',$("#hot_b_all")[0]);
    g('hot_in',$('#hot_in')[0]);
    
g('hot_s,Москва,Россия',$('#russia_hot')[0]);
g('hot_s,Москва,Турция',$('#turkey_hot')[0]);
g('hot_s,Москва,Италия',$('#italy_hot')[0]);
g('hot_s,Москва,Кипр',$('#cyprus_hot')[0]);
g('hot_s,Москва,Андорра',$('#andorra_hot')[0]);
g('hot_s,Москва,Болгария',$('#bulgaria_hot')[0]);
g('hot_s,Москва,Марокко',$('#morocco_hot')[0]);
g('hot_s,Москва,Вьетнам',$('#vietnam_hot')[0]);
g('hot_s,Москва,Мексика',$('#mexico_hot')[0]);
//g('hot_s,Москва,Греция',$('#greece_hot')[0]);
g('hot_am',$('#greece_hot')[0]);
g('hot_s,Москва,ОАЭ',$('#uae_hot')[0]);
g('hot_s,Москва,Таиланд',$('#thailand_hot')[0]);
g('hot_s,Москва,Доминикана',$('#dominikana_hot')[0]);
g('hot_s,Москва,Тунис',$('#tunis_hot')[0]);
g('hot_s,Москва,Израиль',$('#israel_hot')[0]);
g('hot_s,Москва,Индия',$('#goa_hot')[0]);
g('hot_s,Москва,Испания',$('#spain_hot')[0]);

g('hot_s,Москва,Куба',$('#cuba_hot')[0]);
g('hot_s,Москва,Чехия',$('#czech_hot')[0]);
g('hot_s,Москва,Мальдивы,5',$('#maldives_hot')[0]);
g('hot_s,Москва,Камбоджа',$('#cambodia_hot')[0]);

g('hot_s,Москва,Австрия',$('#austria_hot')[0]);
g('hot_s,Москва,Андорра',$('#andorra_hot')[0]);
g('hot_s,Москва,Индонезия',$('#bali_hot')[0]);
g('hot_s,Москва,Китай',$('#china_hot')[0]);
g('hot_s,Москва,Франция',$('#france_hot')[0]);
g('hot_s,Москва,Грузия',$('#georgia_hot')[0]);
g('hot_s,Москва,Мальта',$('#malta_hot')[0]);
g('hot_s,Москва,Маврикий,5',$('#mauritius_hot')[0]);
g('hot_s,Москва,Сейшелы,5',$('#seychelles_hot')[0]);
g('hot_s,Москва,Сингапур',$('#singapore_hot')[0]);
g('hot_s,Москва,Шри Ланка',$('#srilanka_hot')[0]);
g('hot_s,Москва,Египет',$('#egypt_hot')[0]);
g('aviabilet',$('#aviabilety')[0]);
*/
	s2 = new Slider($("#slide2")[0], 3000);
	s3 = new Slider($("#slide3")[0], 3100);
	s5 = new Slider($("#slide5")[0], 3300);
	s5 = new Slider($("#slide6")[0], 3300);


	$(".addinfoCon").hide();
	$(".addinfoTitle").click(function(){
		$(this).next().slideToggle();
	});
// закладки
	$("#content div.tab").hide(); // Скрываем содержание
	$("#tabs li").attr("id",""); // активная только одна
	$("#tabs li:first").attr("id","current"); // Активируем первую закладку
	$("#content div.tab:first").fadeIn(); // Выводим содержание
    $('#tabs div').click(function(e) {
        e.preventDefault();        
        $("#content div.tab").hide(); //Скрыть все содержание
        $("#tabs li").attr("id",""); //Сброс ID
        $(this).parent().attr("id","current"); // Активируем закладку
        $('#' + $(this).attr('title')).fadeIn(); // Выводим содержание текущей закладки
    });

};

var time = 30;
function timer(){
	time--;
	$("#timer").text(time);//
	if(time>0) {setTimeout(timer,1000);}else{$("#timer").hide();}
	
}

function no_month(){
$('#month').parent().css("display","none");
}
$('#month2block').css("display","block");
//alert($('#month2').val());
if($('#month2').val()!="") no_month();
/*
webshim.setOptions('forms-ext', { //webshim
    replaceUI: 'auto'
});
webshim.polyfill('forms forms-ext');
*/
  $(function() {
    myonload();
//    setTimeout(timer,1000);
	s = new Slider($("#slide")[0], 6100);
	s4 = new Slider($("#slide4")[0], 3200);
//    $('#layer').fadeIn(3000);
/*
    $('.check-validity').on('click', function () { //webshim
        $(this).jProp('form').checkValidity();
        return false;
    });
*/
  });
/*
$(window).on('beforeunload ',function() {
    if(time>0) return 'Are you sure ?';
});
$(window).on('unload ',function() {
    if(time>0) return 'Are you sure ?';

*/
