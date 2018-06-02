var er = new Vue({
	el:"#main",
	data:{
        house_lists:[],
        regions:[],
        region2:[],
        house_type:[],
        orientations:[],
        tabs:[],
        area_title:"区域",
        price_title:"价格",
        type_title:"房型",
        more_title:"更多",
        selected:true,
        areaTab:true,
        maskShow:false,
        subwayTab:false,
        cityShow:false,
        selectItem:null,
        selectIt:null,
        selectRegions:false,
        selectPrices:false,
        selectMores:false,
        selectInfos:false,
        selec:null,
        morelist:[],
        typelist:[],
	},
	mounted:function(){
    this.getData();
    this.swiperBanner();
    this.maskshow();
	}, 
	methods:{
       getData:function(){
          var that = this;
          $.ajax({
              url:" http://lianjia.com/api/ershoufang/index",
              type:"get",
              dataType:"json",
              data:{

              },
              success:function(res){
                  alert(111);
                  that.house_lists = res.data.house_lists;
              },
              error:function(res){
                 alert("接口失败");
              }
          })
       },
       swiperBanner:function(){
                var mySwiper = new Swiper('.swiper-container',{
                loop: true,
                direction:'horizontal',
                autoplay:true,
                observer: true,
                observeParents:true,
              })
       },
       selectRegion:function(){
          // $(".content-box").animate("height:100%",2s);
           this.maskShow = true;
       	  this.selectRegions = true;
          this.selectInfos = false;
          this.selectPrices = false;
          this.selectMores = false;
       },
       selectInfo:function(){
          this.maskShow = true;
          this.selectInfos = true;
          this.selectRegions = false;
          this.selectPrices = false;
          this.selectMores = false;
       },
       selectMore:function(){
          this.maskShow = true;
          this.selectMores = true;
          this.selectInfos = false;
          this.selectPrices = false;
          this.selectRegions = false;
       },
       selectPrice:function(){
          this.maskShow = true;
          this.selectPrices = true;
          this.selectInfos = false;
          this.selectRegions = false;
          this.selectMores = false;
       },
       maskshow:function(){ 
           var that = this;
           $.ajax({
              url:" http://lianjia.com/api/ershoufang/condition",
              type:"get",
              dataType:"json",
              data:{},
              success:function(res){
                 that.regions = res.data.region;
                 res.data.house_type.forEach(function(it){
                    it.sel = false;
                 });
                 that.house_type = res.data.house_type;
                 res.data.orientation.forEach(function(it){
                    it.sel = false;
                 });
                 that.orientations = res.data.orientation;
                 res.data.tab.forEach(function(it){
                    it.sel = false;
                 });                 
                 that.tabs = res.data.tab;
                 console.log(that.tabs);
                 // console.log(that.house_type);
              },
              error:function(res){
                 alert("接口失败");
              },
           })  
       },
       citys:function(item,index){
            this.cityShow = true;
            this.region2 = item.region2;
            console.log(index);
            this.selectItem = index;
            this.selectIt = null;
       },
       regionSelect:function(item,index){
            this.selectIt = index;
            this.area_title = item.name;
            this.selectRegions = false;
            this.maskShow = false;
       },
       activeLi:function(){
       	   this.subwayTab = true;
       },
       area:function(){
           this.areaTab = true;
           this.subwayTab =false;
       },
       subway:function(){
           this.areaTab = false;
           this.subwayTab =true;
       },
       sele:function(Item){
           this.orientations.forEach(function(it){
                it.sel = false;
           });
           Item.sel = true;       
       },
       tab:function(Item){
           this.tabs.forEach(function(it){
                it.sel = false;
           });
           Item.sel = true;
       },
       type:function(Item){
           Item.sel=!Item.sel;
           var that = this;
           if(Item.sel == true){
             this.typelist.push(Item.name);
           }else{
             this.typelist.forEach(function(i,index){
                  if(i == Item.name){
                    that.typelist.splice(index,1);
                  }
             });
           };
           console.log(this.typelist);
       },
       typesure:function(){
          if(this.typelist.length>1){
             this.type_title = "多选";
          }else{
              if(this.typelist.length == 1){
                 this.type_title = this.typelist[0];
              }else{
                 this.type_title = "房型";
              }
          } 
          this.selectInfos = false;
          this.maskShow = false;
       },
       sure:function(){
            var that = this;
            this.orientations.forEach(function(i){
                if(i.sel == true){
                   that.morelist.push(i);
                }
            });
            this.tabs.forEach(function(i){
               if(i.sel == true){
                   that.morelist.push(i);
                }
            });
            console.log(this.morelist);
            this.selectMores = false;
            this.maskShow = false;
       },
       clear:function(){
           this.orientations.forEach(function(i){
              i.sel = false;
           });
           this.tabs.forEach(function(i){
              i.sel = false;
           });
       }
	}
})