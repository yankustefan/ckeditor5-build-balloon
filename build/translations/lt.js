(function(d){	const l = d['lt'] = d['lt'] || {};	l.dictionary=Object.assign(		l.dictionary||{},		{"%0 of %1":"",Aquamarine:"Aquamarine",Big:"Didelis",Black:"Juoda",Blue:"Mėlyna",Bold:"Paryškintas","Bulleted List":"Sąrašas","Decrease indent":"Sumažinti atitraukimą",Default:"Numatyta","Dim grey":"Pilkšva","Document colors":"","Dropdown toolbar":"","Edit block":"Redaguoti bloką","Editor toolbar":"","Font Background Color":"Šrifto fono spalva","Font Color":"Šrifto spalva","Font Family":"Šrifto šeima","Font Size":"Šrifto dydis",Green:"Žalia",Grey:"Pilka",Huge:"Milžiniškas","Increase indent":"Padidinti atitraukimą",Italic:"Kursyvas","Light blue":"Šviesiai mėlyna","Light green":"Šviesiai žalia","Light grey":"Šviesiai pilka",Next:"","Numbered List":"Numeruotas rąrašas",Orange:"Oranžinė",Previous:"",Purple:"Violetinė",Red:"Raudona",Redo:"Pirmyn","Remove color":"Pašalinti spalvą","Remove Format":"Naikinti formatavimą","Rich Text Editor":"Raiškiojo teksto redaktorius","Rich Text Editor, %0":"Raiškiojo teksto redaktorius, %0","Show more items":"",Small:"Mažas",Strikethrough:"Perbrauktas",Subscript:"Žemiau",Superscript:"Aukščiau",Tiny:"Mažytis",Turquoise:"Turkio",Underline:"Pabrauktas",Undo:"Atgal",White:"Balta",Yellow:"Geltona"}	);l.getPluralForm=function(n){return (n % 10 == 1 && (n % 100 > 19 || n % 100 < 11) ? 0 : (n % 10 >= 2 && n % 10 <=9) && (n % 100 > 19 || n % 100 < 11) ? 1 : n % 1 != 0 ? 2: 3);;};})(window.CKEDITOR_TRANSLATIONS||(window.CKEDITOR_TRANSLATIONS={}));