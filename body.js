const getBody = (link, comment) => {

    return {
        "body": {
            "type": "doc",
            "content": [
                {
                    "type": "panel",
                    "content": [
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "This is an automatic comment from Github."
                                }
                            ]
                        }
                    ],
                    "attrs": {
                        "panelType": "info"
                    }
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "type": "text",
                            "text": "Go to the commit",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "href": link
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "type": "text",
                            "text": comment
                        },
                        {
                            "type": "emoji",
                            "attrs": {
                                "shortName": ":nerd:"
                            }
                        }
                    ]
                }
            ],
            "version": 1
        }
    }

}

module.exports = {
    getBody
}