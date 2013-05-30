$(document).ready(function(){

    // Cache the Window object
    $window = $(window);

    // Cache the Y offset and the speed of each sprite
    $('[data-type]').each(function() {
        $(this).data('offsetY', parseInt($(this).attr('data-offsetY')));
        $(this).data('Xposition', $(this).attr('data-Xposition'));
        $(this).data('speed', $(this).attr('data-speed'));
    });

    // For each element that has a data-type attribute
    $('section[data-type="background"]').each(function(){


        // Store some variables based on where we are
        var $self = $(this),
            offsetCoords = $self.offset(),
            topOffset = offsetCoords.top;

        // When the window is scrolled...
        $(window).scroll(function() {

            // If this section is in view
            if ( ($window.scrollTop() + $window.height()) > (topOffset) &&
                ( (topOffset + $self.height()) > $window.scrollTop() ) ) {

                console.log($self[0].id);

                // Scroll the background at var speed
                // the yPos is a negative value because we're scrolling it UP!
                var yPos = -($window.scrollTop() / $self.data('speed'));

                // If this element has a Y offset then add it on
                if ($self.data('offsetY')) {
                    yPos += $self.data('offsetY');
                }

                // Put together our final background position
                var coords = '50% '+ yPos + 'px';

                // Move the background
                $self.css({ backgroundPosition: coords });

                // Check for other sprites in this section
                $('[data-type="sprite"]', $self).each(function() {

                    // Cache the sprite
                    var $sprite = $(this);

                    // Use the same calculation to work out how far to scroll the sprite
                    var yPos = -($window.scrollTop() / $sprite.data('speed'));

                    var xPos = $sprite.data('Xposition');

                    if($self.get(0).id === "intro") {
                        xPos = Math.min(25 + $window.scrollTop() / 8, 50) + '%';
                    }


                    var coords = xPos + ' ' + (yPos + $sprite.data('offsetY')) + 'px';

                    $sprite.css({ backgroundPosition: coords });

                }); // sprites

                // Check for other heading
                $('[data-type="heading"]', $self).each(function() {
                    console.log(this);

                    $(this).css({ opacity: Math.max(1 - $window.scrollTop() / 100, 0) });

                }); // sprites

                // Check for any Videos that need scrolling
                $('[data-type="video"]', $self).each(function() {

                    // Cache the video
                    var $video = $(this);

                    // There's some repetition going on here, so
                    // feel free to tidy this section up.
                    var yPos = -($window.scrollTop() / $video.data('speed'));
                    var coords = (yPos + $video.data('offsetY')) + 'px';

                    $video.css({ top: coords });

                }); // video

            }; // in view

        }); // window scroll

    });	// each data-type

}); // document ready
