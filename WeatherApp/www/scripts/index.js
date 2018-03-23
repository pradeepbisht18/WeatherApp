var weatherJson;
var app = {
	
    initialize: function () {
	this.bindEvents();
	this.setupVue();
	
	/*
	Loading of the data from the json file to an object
	*/
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myObj = JSON.parse(this.responseText);
				weatherJson = myObj;
			}
		}
	xmlhttp.open("GET", "../weather2.json", true);
	xmlhttp.send();
		
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function (id) {
        console.log('Received Event: ' + id);
    },
    setupVue: function () {
					// modal component
					Vue.component('modal', {
					  template: '#modal-template',
					  props: ['show'],
					  methods: {
						close: function () {
						  this.$emit('close');
						},
						closeModal: function () {
						  this.close();
						}
					  },
					  mounted: function () {
						document.addEventListener("keydown", (e) => {
						  if (this.show && e.keyCode == 27) {
							this.close();
															 

						  }
						});
					  }
					});

					
					/*Main page instance: start*/
           var vm = new Vue({
            el: "#vue-instance",
            data: {
					uName:'',
					psw:'',
			},
            methods: {
				/*To verify the user details entered are correct or not
				 Through error if not correct */
                verify: function () {
          			var flag =0;
					var user = this.uName;
					var pass = this.psw;
					user = user.trim(" ");
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() {
						if (this.readyState == 4 && this.status == 200) {
							var myObj = JSON.parse(this.responseText);
							 var index;
							 for (index =0; index < myObj.length; ++index)
							 {
								 if ( myObj[index].id == user && myObj[index].password == pass)
								 {
									 flag =1;
									document.getElementById("vue-instance").style.display = 'none';
									document.getElementById("vue-instance-loc").style.display = 'block';
									document.getElementById("homeDiv").style.display='block';
									break;
								 } 
							 }
							 if (flag ==0){
								 document.getElementById("loginAlert").style.display='block';
							}
						}
					};
					xmlhttp.open("GET", "../User.json", true);
					xmlhttp.send();
					
                },
				/*Function invoked to reset the values when a user press logout*/
				reset_home:function(){
					document.getElementById("homeDiv").style.display='none';
					document.getElementById("vue-instance-loc").style.display='none';
					document.getElementById("vue-instance").style.display='block';
					document.getElementById("loginAlert").style.display='none';
					this.uName='';
					this.psw='';
					
				}
            }
        });
		
		/*Main page instance: end*/

		var vm2 = new Vue({
            el: "#vue-instance-loc",
            data: {
				 cName:'',
				 stateName:'',
				 cityName:'',
				 zipcode:'',
				 temp:'',
				 feels:'',
				 humid:'',
				 weather:''
            },
            methods: {
				/*Current button handling done here*/
                current: function () {
					document.getElementById("vue-instance-loc").style.display='none';
					document.getElementById("vue-instance-zipcode").style.display = 'block';
					vm3.init();
				},
				
				/*Specific location button handling done here*/
				specific: function(){
					document.getElementById("vue-instance-loc").style.display='none';
					document.getElementById("vue-instance-zipcode").style.display = 'block';
				},
				/*Proceed button handling done here*/
				proceed: function(){
					document.getElementById("vue-instance-loc").style.display='none';
					document.getElementById("vue-instance-search").style.display = 'block';
					vm5.init_table();
				}
			}
		 });
		 
		 /*Instance for the Zipcode details gathering*/
		 var vm3 = new Vue({
			 el:"#vue-instance-zipcode",
			 data:{
				 zipCode:'',
				 cName:'',
				 stateName:'',
				 cityName:'',
				 zipcode:'',
				 temp:'',
				 feels:'',
				 humid:'',
				 weather:'',
				 msg:''
			 },
			 methods: {
				 /*Specific location details are fetched if the zipcode is wrong 
				  or the data is not available : proper messages are displayed*/
				 specific_submit:function(){
					 this.zipCode= this.zipCode.trim(" ");
					 
					 if (this.zipCode)
					 {
						 if (this.zipCode >= 10000 && this.zipCode <= 99999)
						 {
							var index;
							try{
								for (index =0; index < weatherJson.length;++index)
								{
								
									if (weatherJson[index].current_observation.display_location.zip == this.zipCode)
									{
									 document.getElementById("selectZip").style.display='none';
									 document.getElementById("details").style.display='block';
									 this.cName = weatherJson[index].current_observation.display_location.country;
									 this.stateName = weatherJson[index].current_observation.display_location.state_name;
									 this.cityName = weatherJson[index].current_observation.display_location.city;
									 this.zipcode = this.zipCode;
									 this.temp = weatherJson[index].current_observation.temperature_string;
									 this.feels = weatherJson[index].current_observation.feelslike_string;
									 this.humid = weatherJson[index].current_observation.relative_humidity;
									 this.weather = weatherJson[index].current_observation.weather;
									 this.zipCode = '';
									 break;
									}
								 }
							}
							 catch(e)
							 {
								 this.zipCode = '';
								 this.msg="Data for location not available";
								 document.getElementById("zipAlert").style.display='block';
							 }
						 }else{
							 this.msg ="Zipcode entered is not valid";
							 document.getElementById("zipAlert").style.display='block';
						 }
					 }
					 else{
						 this.msg ="Enter the Zipcode Please";
						 document.getElementById("zipAlert").style.display='block';
					 }
				 },
				 /*This is the Current location function 
				   Here we are getting the first element of the  database
				   as the location api is not implemented.
				   */
				 init: function(){
					 	 document.getElementById("selectZip").style.display='none';
						 document.getElementById("details").style.display='block';
						 this.cName = weatherJson[0].current_observation.display_location.country;
						 this.stateName = weatherJson[0].current_observation.display_location.state_name;
						 this.cityName = weatherJson[0].current_observation.display_location.city;
						 this.zipcode = weatherJson[0].current_observation.display_location.zip;
						 this.temp = weatherJson[0].current_observation.temperature_string;
						 this.feels = weatherJson[0].current_observation.feelslike_string;
						 this.humid = weatherJson[0].current_observation.relative_humidity;
						 this.weather = weatherJson[0].current_observation.weather;
						 this.url=weatherJson[0].current_observation.icon_url;
						 this.zipCode = ''; 
				 },
				 /*Function to reset the form values*/
				 clear: function(){
					 
					document.getElementById("vue-instance-loc").style.display='block';
					document.getElementById("selectZip").style.display='block';
					document.getElementById("details").style.display='none';
					document.getElementById("vue-instance-zipcode").style.display = 'none';
					document.getElementById("vue-instance-search").style.display='none';
					document.getElementById("zipAlert").style.display='none';
					this.zipCode ='';
				 }
			 }
		 });
		
		/*Vue instance for the Menu bar functionalities 
		 Home : trace every user to home page
		 logout: logout the user from any window to the main page
		 About Us : implement Modal pop-up to display the information about APP.
		 */
		var vm4 = new Vue({
			el:'#homeDiv',
			data:{
				about:false,
			},
			methods:{
			    home: function () {
					vm3.clear();
					vm5.clear_table();
				},
				logout: function(){
					this.home();
					vm.reset_home();
				}
			}
		});
		
		/*Component for the Grid creation and searching and sorting of the data
		  */
		Vue.component('search-grid', {
		  template: '#grid-template',
		  props: {
			data: Array,
			columns: Array,
			filterKey: String
		  },
		  data: function () {
			var sortOrders = {}
			this.columns.forEach(function (key) {
			  sortOrders[key] = 1
			})
			return {
			  sortKey: '',
			  sortOrders: sortOrders
			}
		  },
		  computed: {
			filteredData: function () {
			  var sortKey = this.sortKey
			  var filterKey = this.filterKey && this.filterKey.toLowerCase()
			  var order = this.sortOrders[sortKey] || 1
			  var data = this.data
			  if (filterKey) {
				data = data.filter(function (row) {
				  return Object.keys(row).some(function (key) {
					return String(row[key]).toLowerCase().indexOf(filterKey) > -1
				  })
				})
			  }
			  if (sortKey) {
				data = data.slice().sort(function (a, b) {
				  a = a[sortKey]
				  b = b[sortKey]
				  return (a === b ? 0 : a > b ? 1 : -1) * order
				})
			  }
			  return data
			}
		  },
		  filters: {
			capitalize: function (str) {
			  return str.charAt(0).toUpperCase() + str.slice(1)
			}
		  },
		  methods: {
			sortBy: function (key) {
			
			  this.sortKey = key
			  this.sortOrders[key] = this.sortOrders[key] * -1
			}
		  }
		})

	/*Instance for the data to put in the Grid*/
	var vm5 = new Vue({
	  el: '#vue-instance-search',
	  data: {
		searchQuery: '',
		gridColumns: ['St','City','Zip', 'Temp','Weather'],
		gridData: []
	  },
	  methods:{
		  init_table: function(){
			 for (var i =0 ; i < weatherJson.length;i++)
			{
			  if(weatherJson[i].current_observation){
					this.gridData.push({St: weatherJson[i].current_observation.display_location.state,
										City:  weatherJson[i].current_observation.display_location.city,
										Zip:  weatherJson[i].current_observation.display_location.zip,
										Temp:  weatherJson[i].current_observation.temperature_string,
										Weather:  weatherJson[i].current_observation.weather
					});
					
			  }
		    }
			  
		 }, //End of init_table
		
		clear_table: function()
		{
			this.searchQuery='';
			this.gridData=[];
		}
	  }
	})
		
    }
};

app.initialize();