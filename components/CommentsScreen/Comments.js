import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'

export default function Comments({ post }) {
    return (
        <ScrollView className="bg-gray-800 rounded-sm py-1 mb-[10]">
            {post.comments?.map((comment, index) => (
                <View key={index} className="flex mt-[5] bg-gray-900 pt-2 pb-3 px-2 mx-4 my-2 rounded-md ">
                    <View className="flex-row items-center">
                        <Image source={{
                            uri: comment.profile_picture
                        }}
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: 50,
                                marginLeft: 6,
                                marginRight: 4,
                                borderWidth: 1.6,
                                borderColor: "#ff8501"
                            }} />
                        <Text className="font-[600] text-white flex-1">{comment.user}</Text>
                        {comment.createdAt && <Text className="font-[600] text-white">{comment.createdAt?.toDate().toISOString()}</Text>}
                    </View>
                    <View>
                        <Text className="text-white">
                            {'\t\t\t\t\t\t'}{comment.comment}
                        </Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    )
}