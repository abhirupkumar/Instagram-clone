import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Divider } from 'react-native-elements'
import { auth, db } from '../../firebase'
import { arrayRemove, arrayUnion, collection, doc, onSnapshot, updateDoc } from 'firebase/firestore'

const postFooterIcon = [
    {
        name: 'Like',
        imageUrl: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/like',
        likedImageUrl: 'https://img.icons8.com/ios-glyphs/90/fa314a/like'
    },
    {
        name: 'Comment',
        imageUrl: 'https://img.icons8.com/material-outlined/60/ffffff/speech-bubble'
    },
    {
        name: 'Share',
        imageUrl: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/paper-plane'
    },
    {
        name: 'Save',
        imageUrl: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/bookmark-ribbon'
    }
]

const Post = ({ post, navigation }) => {

    const [postUser, setPostUser] = useState(null);

    const getUsername = () => {
        const unsubscribe = doc(collection(db, 'users'), post.owner_email);
        onSnapshot(unsubscribe, (snapshot) => {
            setPostUser({
                username: snapshot.data().username,
                profile_picture: snapshot.data().profile_picture,
            })
        });
        return unsubscribe;
    }

    useEffect(() => {
        getUsername()
    }, [])

    const handleLike = (post) => {
        const currentLikeStatus = !post.likes_by_users.includes(
            auth.currentUser.email
        )
        updateDoc(doc(collection(doc(collection(db, 'users'), post.owner_email), "posts"), post.id), {
            likes_by_users: currentLikeStatus ? arrayUnion(auth.currentUser.email) : arrayRemove(auth.currentUser.email)
        }).then(() => { }).catch(error => {
            console.log("Error updating document: ", error)
        })
    }

    return (
        <View className="mb-[30] ">
            <Divider width={1} orientation="vertical" />
            {postUser && <PostHeader post={post} postUser={postUser} />}
            <PostImage post={post} />
            <View className="mx-[15] mt-[10]">
                <PostFooter post={post} handleLike={handleLike} navigation={navigation} />
                <Likes post={post} />
                <Caption post={post} postUser={postUser} />
                {post.comments.length > 0 && <CommentSection post={post} navigation={navigation} />}
                {post.comments.length > 0 && <Comments post={post} />}
            </View>
        </View>
    )
}

const PostHeader = ({ post, postUser }) => {

    return (
        <View className="flex-row justify-between m-[5] items-center">
            <View className="flex-row items-center">
                <Image source={{
                    uri: postUser?.profile_picture
                }}
                    style={{
                        width: 35,
                        height: 35,
                        borderRadius: 50,
                        marginLeft: 6,
                        borderWidth: 1.6,
                        borderColor: "#ff8501"
                    }} />
                <Text className="text-white ml-[5] font-[700]">
                    {postUser?.username}
                </Text>
            </View>
            <View>
                <Text className="text-white font-[900]">...</Text>
            </View>
        </View>
    )
}

const PostImage = ({ post }) => {
    return (
        <View className="w-full h-[450]">
            <Image source={{
                uri: post.imageUrl
            }}
                style={{
                    height: '100%',
                    width: '100%',
                    resizeMode: 'cover'
                }} />
        </View>
    )
}

const PostFooter = ({ handleLike, post, navigation }) => {
    return (
        <View className="flex-row">
            <View className="flex-row w-[32%] justify-between">
                <TouchableOpacity onPress={() => handleLike(post)}>
                    <Image style={{
                        width: 33,
                        height: 33,
                    }} source={{ uri: post.likes_by_users.includes(auth.currentUser.email) ? postFooterIcon[0].likedImageUrl : postFooterIcon[0].imageUrl }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.push("CommentsScreen", { post })}>
                    <Image style={{
                        width: 33,
                        height: 33,
                    }} source={{ uri: postFooterIcon[1].imageUrl }} />
                </TouchableOpacity>
                <Icon imgStyle={{
                    width: 33,
                    height: 33,
                    tarnsform: [{ rotate: '320deg' }]
                }} imgUrl={postFooterIcon[2].imageUrl} />
            </View>
            <View className="flex-1 items-end">
                <Icon imgStyle={{
                    width: 33,
                    height: 33,
                }} imgUrl={postFooterIcon[3].imageUrl} />
            </View>
        </View>
    )
}

const Icon = ({ imgStyle, imgUrl }) => (
    <TouchableOpacity>
        <Image style={imgStyle} source={{ uri: imgUrl }} />
    </TouchableOpacity>
)

const Likes = ({ post }) => (
    <View className='flex-row mt-[4]'>
        <Text className="text-white font-[600]">{post.likes_by_users.length.toLocaleString('en')} likes</Text>
    </View>
)

const Caption = ({ postUser, post }) => (
    <View className="mt-[5]">
        <Text className="text-white">
            <Text className="font-[600]">{postUser?.username}</Text>
            <Text> {post.caption}</Text>
        </Text>
    </View>
)

const CommentSection = ({ post, navigation }) => (
    <View className="mt-[5] mb-[3]">
        <TouchableOpacity onPress={() => navigation.navigate("CommentsScreen", { post })}>
            {post?.comments?.length > 0 &&
                (<Text className="text-gray-500">
                    {'View'}{post?.comments?.length > 1 ? ' all' : ''}{' '}{post?.comments?.length}{' '}{post?.comments?.length > 1 ? 'comments' : 'comment'}
                </Text>)}
        </TouchableOpacity>
    </View>
)

const Comments = ({ post }) => (
    <View className="bg-gray-800 rounded-sm py-1">
        {post.comments?.slice(0, 1).map((comment, index) => (
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
                    <Text className="font-[600] text-white">{comment.user}</Text>
                </View>
                <View>
                    <Text className="text-white w-50">
                        {'\t\t\t\t\t\t'}{comment.comment}
                    </Text>
                </View>
            </View>
        ))}
    </View>
)

export default Post