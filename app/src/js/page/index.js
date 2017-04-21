require('../../less/common/common.less');


$(document).on('plusready', function (e) {
	var id = null,
		bright = null,
		covered = false,
		startTime = null,
		endTime = null,
		audioStartTime = null,
		audioEndTime = null;
		
	var $btnStart = $('#btn-start'),
		$audio = $('#audio');
	
	var metaScore = 29;
	
	function watchProximity() {
		bright = plus.screen.getBrightness();
		id = plus.proximity.watchProximity(watching, watchFail);
			
		playAudio();
	}
	function watching( d ) {
		if (d < 1) {
			if (!startTime) {
				startTime = new Date().getTime();
			}
			covered = true;
			//plus.screen.setBrightness(0);
		}
		else {
			if (covered) {
				endTime = new Date().getTime();
				covered = false;
				//plus.screen.setBrightness(bright);
				
				setButtonEnabled();
				plus.proximity.clearWatch(id);
				
				setScore(startTime, endTime);
				startTime = null;
				endTime = null;
			}
		}
	}
	function playAudio() {
		var startSec = parseInt(Math.random() * 3000 + 1000);
		var endSec = parseInt(Math.random() * 7000 + 5000);
		
		window.setTimeout(function () {
			$audio[0].currenTime = 0;
			$audio[0].play();
			
			audioStartTime = new Date().getTime();
		}, startSec);
		window.setTimeout(function () {
			$audio[0].pause();
			$audio[0].currenTime = 0;
			
			audioEndTime = new Date().getTime();
		}, endSec);
	}
	function watchFail( e ) {
		plus.proximity.clearWatch(id);
		id = null;
		outLine( "监听失败:" + e.message );
	}
	function setScore(start, end) {
		var last;
		if (!audioStartTime) {
			last = 0;
		}
		else if (!audioEndTime) {
			last = end - (start - audioStartTime);
		}
		else {
			last = (end - start) - Math.abs(audioEndTime - end) - Math.abs(start - audioStartTime);
		}
		
		$('#score').html(last <= 0 ? 0 : last * metaScore);
	}
	function setButtonDisabled() {
		window.setTimeout(function () {
			$btnStart.attr('disabled', 'disabled');
		});
	}
	function setButtonEnabled() {
		window.setTimeout(function () {
			$btnStart.removeAttr('disabled');
		});
	}
	
	$btnStart.on('click.buttonStart', function (e) {
		watchProximity();
		
		setButtonDisabled();
	});;
});
