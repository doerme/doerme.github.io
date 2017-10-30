---
layout: default
title: 这是首页
---

# {{page.title}}

## 最新文章

{% for post in site.posts %}
# {{ post.date | date_to_string }}[{{ post.title }}]({{ site.baseurl }}{{ post.url }})
{% endfor %}