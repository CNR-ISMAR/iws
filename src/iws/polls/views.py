from django.http import HttpResponse
from django.template import loader

def index(request):
    # latest_question_list = Question.objects.order_by('-pub_date')[:5]
    # output = 'SAMPLE OUTPUT'
    # return HttpResponse(output)

    # template = loader.get_template('./templates/polls.html')# 502 bad gateway
    # template = loader.get_template('noindex.html')# 502 bad gateway
    template = loader.get_template('polls.html')# OK

    # context = {
    #     'latest_question_list': latest_question_list,
    # }
    context = {}
    return HttpResponse(template.render(context, request))
