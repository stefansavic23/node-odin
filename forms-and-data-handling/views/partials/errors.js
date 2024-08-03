<html>
    <body>
    <% if (locals.errors) {%>
    <ul>
      <% errors.forEach(function(error) { %>
        <li><%= error.msg %></li>
      <% }); %>
    </ul>
  <% } %>
    </body>
</html>