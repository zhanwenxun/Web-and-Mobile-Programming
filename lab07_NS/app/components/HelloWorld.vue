<template>
    <Page>
        <ActionBar title="Home" class="action-bar" />
        <StackLayout orientation="Vertical" verticalAlignment="center"
            horizontalAlignment="center">
            <Label class="class1" text="label1" />
            <TextField class="class2" v-model="username" />
            <Button text="ADD" @tap="do1" />
            <ListView for="food in foods" @itemTap="foodDetail">
                <v-template>
                    <StackLayout orientation="horizontal">
                        <Label :text="food.name" class="item" />
                    </StackLayout>
                </v-template>
            </ListView>
        </StackLayout>
    </Page>
</template>

<script>
    import DetailPage from "./DetailPage";
    export default {
        data() {
            return {
                username: "",
                foods: [{
                        id: 1,
                        name: "food1",
                        price: 10,
                        feedbacks: [{
                                emojicon: "😀",
                                words: "good"
                            },
                            {
                                emojicon: "😄",
                                words: "fine"
                            },
                            {
                                emojicon: "😁",
                                words: "soso"
                            }
                        ]
                    },
                    {
                        id: 2,
                        name: "food2",
                        price: 20,
                        feedbacks: [{
                                emojicon: "😀",
                                words: "good"
                            },
                            {
                                emojicon: "😄",
                                words: "fine"
                            },
                            {
                                emojicon: "😁",
                                words: "soso"
                            }
                        ]
                    },
                    {
                        id: 3,
                        name: "food3",
                        price: 30,
                        feedbacks: [{
                                emojicon: "😀",
                                words: "good"
                            },
                            {
                                emojicon: "😄",
                                words: "fine"
                            },
                            {
                                emojicon: "😁",
                                words: "soso"
                            }
                        ]
                    }
                ]
            };
        },
        methods: {
            do1() {
                alert(this.username);
            },
            foodDetail(event) {
                // alert(event.item.price);
                this.$navigateTo(DetailPage, {
                    props: {
                        food: event.item
                    }
                });
            }
        }
    };
</script>

<style scoped>
    .class1 {
        margin: 10;
        color: red;
        border-width: 2;
        height: 50;
    }

    .class2 {
        margin: 10;
        font-size: 30;
        color: blue;
    }

    .item {
        margin: 10;
        font-size: 40;
        color: brown;
    }
</style>