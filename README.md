# HTML5 and JavaScript Webcam PhotoBooth Web App
This application allows you to take webcam photos and save them on a server.

It's a HTML5 based application with fallback to Flash for older browsers that don't support webcam streams.

You can configure everything with HTML and CSS.

You'll need a server with ASP or PHP support (both ASP and PHP files are included in this package)

The JavaScript code contains comments so you can understand the code easily.

See HTML5 Webcam Photobooth Web App project on [my website](https://vamapaull.com/html5-webcam-photobooth-web-app/) and let me know if you have any questions. Enjoy! 

## Instructions on how to customize the web app:
### CSS and HTML
The entire application design can be changed with CSS and HTML. Basic knowledge will be enough to customize it however you want.
![Basic CSS](https://vamapaull.com/work/PhotoBoothHTML/documentation/images/basic-css.jpg)

### Changing the webcam image size
For that you have the two variables named width and height inside the JavaScript code.
![Width and Height](https://vamapaull.com/work/PhotoBoothHTML/documentation/images/width-and-height.jpg)
The height value is only used for the Flash fallback. For the HTML5 webcam app you can change the width of the app and the height will be set based on your webcam video feed aspect ratio.

### Save on server
For that you have multiple options. You can use a server based on PHP, ASP or a Java.

Inside the handleButtonSaveClick function you have save.php, that can be changed to save.asp or save.jsp depending on what type or server you have.
![Save file location](https://vamapaull.com/work/PhotoBoothHTML/documentation/images/save.jpg)
You should also make sure that on your server, near the save server-side file, you also have a folder named images with permissions to write on your server.
