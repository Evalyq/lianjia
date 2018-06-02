function getQuery(){
        var str = (location.search.length > 0 ? location.search.substring(1) : ''),
        args = {},
        items = str.length ? str.split("&") : [],
        item = null,
        name = null,
        value = null;
        for (i=0; i < items.length; i++){
          item = items[i].split("=");
          name = decodeURIComponent(item[0]);
          value = decodeURIComponent(item[1]);
          if (name.length) {
            args[name] = value;
          }
        }
        return args;
};
var info = new Vue({
   el:"#main",
   data:{
       house_info:{},
   },
   mounted:function(){
       this.getData();
   },
   methods:{
       getData:function(){
       	  var that = this;
       	  $.ajax({
       	  	 url:'http://lianjia.com/api/ershoufang/info',
       	  	 dataType:'json',
       	  	 type:'get',
       	  	 data:{
       	  	 	id:getQuery().id, 
       	  	 },
       	  	 success:function(res){
                that.house_info = res.data.house_info;
       	  	 },
       	  	 error:function(res){
                alert("接口调用失败");
       	  	 }
       	  })
       }
   }
})