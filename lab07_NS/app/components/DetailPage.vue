<template>
    <Page>
        <ActionBar title="Food Detail" class="action-bar" />
        <StackLayout>
            <Label text="Food Detail" class="title" />
            <Label :text="$props.food.name" class="item" />
            <Label :text="$props.food.price" class="item" />
            <ListView for="feedback in $props.food.feedbacks">
                <v-template>
                    <StackLayout orientation="horizontal">
                        <Label :text="feedback.emojicon" class="emoji" />
                        <Label :text="feedback.words" class="words" />
                    </StackLayout>
                </v-template>
            </ListView>
        </StackLayout>
    </Page>
</template>

<script>
    export default {
        props: ["food"]
    };
</script>

<style scoped>
    .item {
        margin: 10;
        font-size: 50;
        color: brown;
    }

    .title {
        margin: 20;
        font-size: 60;
    }

    .emoji {
        margin: 10;
        font-size: 40;
    }

    .words {
        margin: 10;
        font-size: 30;
    }
</style>