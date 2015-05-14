spa.fake = (function(){
	'use strict';
	var peopleList, fakeIdSerial, makeFakedId, mockSio;

	fakeIdSerial = 5;

	makeFakedId = function(){
		return 'id_' + String( fakeIdSerial++ );
	}

	peopleList = [
		{ 
			name : 'Betty', _id : 'id_01',
			css_map : {
				top  : 20,
				left : 20,
				'background-color' : 'rgb(128,128,128)'
			}
		},
		{
			name : 'Mike', _id : 'id_02',
			css_map : {
				top  : 60,
				left : 20,
				'background-color'  : 'rgb(128,255,128)'
			}
		},
		{
			name : 'Pebbles', _id : 'id_03',
			css_map : {
				top  : 100,
				left : 20,
				'background-color'  : 'rgb(128,192,192)'
			}
		},
		{
			name : 'Wilma', _id : 'id_04',
			css_map : {
				top  : 140,
				left : 20,
				'background-color'  : 'rgb(192,128,128)'
			}
		}
	]

	mockSio = (function(){
		var on_sio, emit_sio, emit_mock_msg,
			send_listchange, listchage_idto, callback_map = {};

		on_sio = function( msg_type, callback ){
			callback_map[ msg_type ] = callback;
		};

		emit_sio = function( msg_type, data ){
			var person_map;
			if ( msg_type === 'adduser' && callback_map.userupdate) {
				setTimeout(function(){
					person_map = {
						_id     : makeFakedId(),
						name    : data.name,
						css_map : data.css_map
					}
					peopleList.push( person_map )
					callback_map.userupdate([ person_map ]);
				},3000)
			};

			if ( msg_type === 'updatechat' && callback_map.updatechat ) {
				setTimeout( function(){
					var user = spa.model.people.get_user();
					callback_map.updatechat([{
						dest_id  :  user.id,
						dest_time : user.name,
						sender_id : data.dest_id,
						msg_text  : 'Thank for the note,' + user.name
					}])
				}, 2000)
			}

			if ( msg_type === 'leavechat' ){
				delete callback_map.listchage;
				delete callback_map.updatechat;

				if ( listchage_idto ) {
					clearTimeout( listchage_idto );
					listchage_idto = undefined;
				}
				send_listchange();
			};

			emit_mock_msg = function(){
				setTimeout( function(){
					if ( callback_map.updatechat ) {
						callback_map.updatechat([{
							dest_id   :  user.id,
							dest_time :  user.name,
							sender_id :  'id_04',
							msg_text  :  'Hi there ' + user.name + '!Wilma here.'
						}])
					};
				} )
			}
		}

		send_listchange = function(){
			listchage_idto = setTimeout( function(){
				if ( callback_map.listchage ) {
					callback_map.listchage([ peopleList ]);
					emit_mock_msg();
					listchage_idto = undefined;
				}else{
					send_listchange();
				}
			}, 1000 )
		}

		send_listchange();

		return { emit : emit_sio, on : on_sio}
	}())

	return {mockSio : mockSio};
}())