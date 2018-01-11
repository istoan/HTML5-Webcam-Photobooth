<%
if Request.TotalBytes>"" then

    'Name of the folder
    folder = "images"

    'Generate unique ID
    max=999999999
    min=1
    Randomize
    id=Int((max-min+1)*Rnd+min)

    'Generate file name
    filename = "photo_" &id &".jpg"

    'Open object used to manipulate binary data
    set objStream = server.CreateObject("ADODB.Stream")
    objStream.Type = 1
    objStream.open
    on error resume next
    objStream.write Request.BinaryRead(Request.TotalBytes)
    objStream.SaveToFile Server.MapPath(folder) &"\" &filename, 2
    if err<>0 then
        'Error saving image
        response.Write(err.description)
    else
        response.Write(filename)
    end if
    objStream.close

    'Clear memory
    set objStream = nothing
    id = vbnullstring
    filename = vbnullstring

else
    'No binary data received
    response.Write "Encoded JPEG information not received."
end if
%>