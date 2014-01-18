window.onload = function() {
	function checkGrades() {
		var studentNo = document.getElementById( 'studentNo').value;
		$.ajax({
			'url': 'http://www.cs.bilkent.edu.tr/~will/courses/CS223/Grades/examgrades_sec' + document.getElementById('section').options[document.getElementById('section').selectedIndex].text + '.html',
			'type': 'GET',
			'success': function( res) {
				var finalNotes = res.responseText;
				var pos = finalNotes.indexOf( studentNo); 
		
				if ( pos > -1) {
					var posA = finalNotes.indexOf( "<TR>");
					var posB = finalNotes.indexOf( "<tr>");
					
					if ( posA > -1 || posB > -1) {
						var rows = null;
						
						if ( posA > -1) {
							rows = finalNotes.split( "<TR>");
						}
						else {
							rows = finalNotes.split( "<tr>");
						}
						
						for ( var i = 0; rows != null && i < rows.length; i++) {
							var posC = rows[i].indexOf( studentNo);
							
							if ( posC > -1) {
								var tokens = rows[i].split( '<TD ALIGN=CENTER VALIGN=MIDDLE>');
								
								if ( tokens.length == 1) {
									tokens = rows[i].split( '<td align="center" valign="middle">');
								}
								
								var finalGrade;
								if ( tokens[1].indexOf( "<p") > -1 || tokens[2].indexOf("<P") > -1) {
									var lastToken = $.trim( tokens[2]);
									finalGrade = lastToken.charAt(3) + lastToken.charAt(4) + lastToken.charAt(5) + "";
									if ( finalGrade != "100") {
										finalGrade = lastToken.charAt(3) + lastToken.charAt(4) + "";
									}
								}
								else {
									var lastToken = $.trim( tokens[2]);
									finalGrade = lastToken.charAt(0) + lastToken.charAt(1) + lastToken.charAt(2) + "";
									if ( finalGrade != "100") {
										finalGrade = lastToken.charAt(0) + lastToken.charAt(1) + "";
									}
								}
								
								if ( parseInt( finalGrade) > -1 && parseInt( finalGrade) < 101 ) {
									document.getElementById( 'result').innerHTML = '<div style="width: 100%; margin: auto;"><p>Notunuz: <span style="color: blue;">' + finalGrade + '</span>, haydi geçmiş olsun :))</p><iframe width="560" height="315" src="http://www.youtube.com/embed/FoX7vd30zq8?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe></div>';
									if ( checkFunc) {
										clearInterval( checkFunc);
									}
								}
								else {
									document.getElementById('result').innerHTML = '<p style="color: red;">Final notunuz henüz konulmamış, düzenli olarak kontrol ediliyor...</p>';
								}
								break;
							}
						}
					}
					else {
						document.getElementById('result').innerHTML = '<p style="color: red; font-weight: bold;">Üzgünüm, Will hocamız notların yer aldığı dökümanın formatını değiştirmiş :(( Notu alamıyorum.</p>';
						if ( checkFunc) {
							clearInterval( checkFunc);
						}
					}
				}
				else {
					document.getElementById('result').innerHTML = '<p style="color: red; font-weight: bold;">' + document.getElementById( 'section').options[document.getElementById('section').selectedIndex].text + ' numaralı CS 223 sectionunda, verilen Bilkent öğrenci numarasına sahip bir öğrenci bulunamamıştır.</p>';
					if ( checkFunc) {
						clearInterval( checkFunc);
					}
				}
			}
		});
	}
	
	document.getElementById( 'checker').onclick = function() {
		var no = document.getElementById( 'studentNo').value;
		if ( no.length == 8) {
			checkGrades();
			var checkFunc = setInterval(function(){checkGrades();},120000);
		}
		else {
			document.getElementById('result').innerHTML = '<p style="color: red; font-weight: bold;">Bilkent öğrenci numarası 8 haneli olmalıdır!</p>';
		}
	}
}