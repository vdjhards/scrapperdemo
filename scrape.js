var request = require('request');
var cheerio = require('cheerio');
const x = [];
request('https://news.ycombinator.com', function(error, response, html) {
    if (!error && response.statusCode == 200) {
        
        const fs = require('fs')
        var $ = cheerio.load(html);
        $('span.comhead').each(function(i, element) {
           
            var a = $(this).prev();
                            var rank = a.parent().parent().text();
                            var title = a.text();
                            var url = a.attr('href');
                            var subtext = a.parent().parent().next().children('.subtext').children();
                            var points = $(subtext).eq(0).text();
                            var username = $(subtext).eq(1).text();
                            var comments = $(subtext).eq(2).text();
                            var metadata = {
                                rank: parseInt(rank),
                                title: title,
                                url: url,
                                points: parseInt(points),
                                username: username,
                                comments: parseInt(comments)
                            };   
                            x.push(metadata);            
        });        
        fs.writeFile("test.json", JSON.stringify(x), function(err) {
            if(err) {
                return console.log(err);
            }
        
            console.log("The file was saved!");
        }); 
       
    }
});