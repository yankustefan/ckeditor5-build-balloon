(function(d){	const l = d['hr'] = d['hr'] || {};	l.dictionary=Object.assign(		l.dictionary||{},		{"%0 of %1":"%0 od %1",Aquamarine:"Akvamarin",Big:"Veliki",Black:"Crna",Blue:"Plava",Bold:"Podebljano","Bulleted List":"Obična lista","Decrease indent":"Umanji uvlačenje",Default:"Podrazumijevano","Dim grey":"Tamnosiva","Document colors":"Boje dokumenta","Dropdown toolbar":"Traka padajućeg izbornika","Edit block":"Uredi blok","Editor toolbar":"Traka uređivača","Font Background Color":"Pozadinska Boja Fonta","Font Color":"Boja Fonta","Font Family":"Obitelj fonta","Font Size":"Veličina fonta",Green:"Zelena",Grey:"Siva",Huge:"Ogroman","Increase indent":"Povećaj uvlačenje","Insert paragraph after block":"","Insert paragraph before block":"",Italic:"Ukošeno","Light blue":"Svijetloplava","Light green":"Svijetlozelena","Light grey":"Svijetlosiva",Next:"Sljedeći","Numbered List":"Brojčana lista",Orange:"Narančasta",Previous:"Prethodni",Purple:"Ljubičasta",Red:"Crvena",Redo:"Ponovi","Remove color":"Ukloni boju","Remove Format":"Ukloni format","Rich Text Editor":"Rich Text Editor","Rich Text Editor, %0":"Rich Text Editor, %0","Select all":"Odaberi sve","Show more items":"Prikaži više stavaka",Small:"Mali",Strikethrough:"Precrtano",Subscript:"Indeks",Superscript:"Eksponent",Tiny:"Sićušan",Turquoise:"Tirkizna",Underline:"Podcrtavanje",Undo:"Poništi",White:"Bijela",Yellow:"Žuta"}	);l.getPluralForm=function(n){return n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2;;};})(window.CKEDITOR_TRANSLATIONS||(window.CKEDITOR_TRANSLATIONS={}));