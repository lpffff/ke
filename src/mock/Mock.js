import Mock from "mockjs"; // 引入mockjs

Mock.mock("/", {
    "lesson_list": {
        "children|5": [{
            knowledge_name: Mock.mock('@ctitle(5)'),
            knowledge_pic: Mock.mock('@image'),
            view_num: 999,
            student_num: 333,
            course_num: 9,
            wx_course_price: "9.99",
            sort_id: 1,
            tag_id: 1,
            knowledge_type: 1,
            live_type: 2,
            is_live: 3,
            start_course_time: function(){
                const start_course_time = (new Date(Mock.mock('@time()'))).getTime();
                return start_course_time;
            },
            end_course_time: 1558454400,
        }]
    }
})
Mock.mock("/guess", {
    "lesson_list": {
        "children|5": [{
            knowledge_name: Mock.mock('@ctitle(5)'),
            knowledge_pic: Mock.mock('@image'),
            view_num: 999,
            student_num: 333,
            course_num: 9,
            wx_course_price: "9.99",
            start_course_time: function(){
                const start_course_time = (new Date(Mock.mock('@time()'))).getTime();
                return start_course_time;
            },
            end_course_time: 1558454400,
        }]
    }
})
Mock.mock("/data", {
    "list|8": [{
        name: "@city",
        "number|1-100": 100
    }]
});
Mock.mock("/lesson_list", {
    "allIds|2": [/[0-9]/],
    byIds: function() {
        const objById = Mock.mock({
            "array|2": [{
                "title|1": ["公开课", "系列课"],
                "content|50": [{
                    "id|1-100": 100,
                    "url|1": Mock.mock('@url'),
                    "title|1": Mock.mock('@csentence(5)'),
                    "time|1-100": 100,
                    "member|1-200": 200,
                    price: 0.0,
                    "cat": [/[0-2]/],
                    "grade": [/[0-2]/],
                    "subject": [/[0-2]/]
                }]
            }]
        });
        const byIds = {};
        for (var i = 0; i < this.allIds.length; i++) {
            byIds[this.allIds[i]] = objById.array[i];
        }
        return byIds;
    }
});