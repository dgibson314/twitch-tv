var usernames = ["quickybaby", "freecodecamp", "ESL_SC2"];

// Client ID to make Twitch API work; according to Twitch docs
// it's safe to put online.
var clientID = "1eoncywiamtsfcj5dtd1rxcf1phsut";

function makeURL(type, name) {
    return "https://wind-bow.gomix.me/twitch-api/" + type + "/" +
        name + "?client_id=1eoncywiamtsfcj5dtd1rxcf1phsut&callback=?";
}

function updateStreams(usernames) {
    usernames.forEach(function(username) {
        // Find out whether the channel is online
        $.getJSON(makeURL("streams", username), function(data) {
            var status;
            if (data.stream === null)
                status = "offline";
            else
                status = "online";

            // Get channel data
            $.getJSON(makeURL("channels", username), function(channel) {
                var displayName = channel.display_name;
                var logoURL = channel.logo;
                var description = status === "online" ? channel.status :"offline";
                var html =
                    '<a href="' + channel.url + '" target="_blank" class="' +
                        status + '">' +
                        '<div class="result row">' +
                            '<div class="col-sm-2">' +
                                '<img class="logo" src="' + logoURL + '">' +
                            '</div>' +
                            '<div class="col-sm-3">' +
                                '<p>' + displayName + '</p>' +
                            '</div>' +
                            '<div class="col-sm-3">' +
                                '<p>' + description + '</p>' +
                            '</div>' +
                        '</div>' +
                    '</a>';
                $("#results").append(html);
            });
        });
    });
}

$(document).ready(function() {

    updateStreams(usernames);

    $("button").click(function() {
        var command = $(this).attr('id');
        if (command === "all")
            $(".online, .offline").removeClass("hidden");
        else if (command === "online") {
            $(".online").removeClass("hidden");
            $(".offline").addClass("hidden");
        }
        else if (command === "offline") {
            $(".online").addClass("hidden");
            $(".offline").removeClass("hidden");
        }
    });
});
    

