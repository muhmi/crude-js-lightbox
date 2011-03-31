# Simple lightbox / image viewer

Its simple, it does not support more than scrolling left<->right.
Press esc or click outside it to exit. Left and right keys work.

# Usage

	<body>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js" type="text/javascript" charset="utf-8"></script> 
		<script src="lightbox.js"  type="text/javascript"></script>
		<script type="text/javascript">
		$(document).ready(function() {
			var lb = new Lightbox({images: [ "predator.jpg", "predator2.jpg"]}); // List the images you wish to display
			$("#lb-open").click(function() {lb.open();}); // Setup the div so that cliking it will open our box
		});
		</script>
		<div id="lb-open">Click here to view images</div>
	</body>
