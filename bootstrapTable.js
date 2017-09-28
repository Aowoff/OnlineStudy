$(function () {
    initTable();
    initDate();
});

function doQuery(params){
    $('#demo-table').bootstrapTable('refresh');    //ˢ�±��
}

function initTable(){
    var url = "user.do?method=listUsers&random="+Math.random();
    $('#demo-table').bootstrapTable({
        method:'POST',
        dataType:'json',
        contentType: "application/x-www-form-urlencoded",
        cache: false,
        striped: true,                              //�Ƿ���ʾ�м��ɫ
        sidePagination: "server",           //��ҳ��ʽ��client�ͻ��˷�ҳ��server����˷�ҳ��*��
        url:url,
        height: $(window).height() - 110,
        width:$(window).width(),
        showColumns:true,
        pagination:true,
        queryParams : queryParams,
        minimumCountColumns:2,
        pageNumber:1,                       //��ʼ�����ص�һҳ��Ĭ�ϵ�һҳ
               pageSize: 20,                       //ÿҳ�ļ�¼������*��
              pageList: [10, 25, 50, 100],        //�ɹ�ѡ���ÿҳ��������*��
              uniqueId: "id",                     //ÿһ�е�Ψһ��ʶ��һ��Ϊ������
        showExport: true,                    
        exportDataType: 'all',
        responseHandler: responseHandler,
        columns: [
        {
            field: '',
                    title: 'Sort No.',
                    formatter: function (value, row, index) {
                    return index+1;
             }
        },
        {
            field : 'id',
            title : 'User ID',
            align : 'center',
            valign : 'middle',
            sortable : true
        }, {
            field : 'institutionCode',
            title : 'Institution Code',
            align : 'center',
            valign : 'middle',
            sortable : true
        }, {
            field : 'institutionName',
            title : 'Institution Name',
            align : 'center',
            valign : 'middle'
        }, {
            field : 'loginId',
            title : 'Login Name',
            align : 'center',
            valign : 'middle',
            sortable : true
        }, {
            field : 'realName',
            title : 'Real Name',
            align : 'center',
            valign : 'middle'
        }, {
            field : 'createTime',
            title : 'Create Time',
            align : 'center',
            valign : 'left',
            formatter : function (value, row, index){
                return new Date(value).format('yyyy-MM-dd hh:mm:ss');
            }
        }, {
            field : 'homeAddress',
            title : 'Address',
            align : 'center',
            valign : 'middle'
        }]
    });
}

function initDate(){
    var start = {
            elem: '#startDate',
            format: 'YYYY-MM-DD hh:mm:ss',
            min: laydate.now(-7),       
            max: laydate.now(),
            istime: true,
            istoday: false,
            choose: function (datas) {
                end.min = datas; //��ʼ��ѡ�ú����ý����յ���С����
                end.start = datas //�������յĳ�ʼֵ�趨Ϊ��ʼ��
            }
        };
        var end = {
            elem: '#endDate',
            format: 'YYYY-MM-DD hh:mm:ss',
            min: laydate.now(-7),       
            max: laydate.now(),
            istime: true, //�Ƿ���ʱ��ѡ��
            isclear: true, //�Ƿ���ʾ���
            istoday: true, //�Ƿ���ʾ����
            issure: true, //�Ƿ���ʾȷ��
            choose: function (datas) {
                start.max = datas; //������ѡ�ú����ÿ�ʼ�յ��������
            }
        };
        laydate(start);
        laydate(end);
}

function queryParams(params) {
    var param = {
        orgCode : $("#orgCode").val(),
        userName : $("#userName").val(),
        startDate : $("#startDate").val(),
        endDate : $("#endDate").val(),
        limit : this.limit, // ҳ���С
        offset : this.offset, // ҳ��
        pageindex : this.pageNumber,
        pageSize : this.pageSize
    }
    return param;
} 

// ����server ��ҳ�����������̫��Ļ� ����һ�β�ѯ�������ݣ�����ʹ��server��ҳ��ѯ��������С�Ļ�����ֱ�Ӱ�sidePagination: "server"  ��Ϊ sidePagination: "client" ��ͬʱȥ��responseHandler: responseHandler�Ϳ����ˣ�
function responseHandler(res) { 
    if (res) {
        return {
            "rows" : res.result,
            "total" : res.totalCount
        };
    } else {
        return {
            "rows" : [],
            "total" : 0
        };
    }
}
