import { firestore } from '../firebase/firebase';

export const getUserInfo = async (userId: string) => {
    const userDocRef = firestore
        .collection('users')
        .doc(userId);
    const docDataRef = await userDocRef.get();
    const userInfo = docDataRef.data();

    return userInfo;
};


  

//   updateLink = async (id, payload) => {
//     return await this.linksCollection.doc(id).update(payload);
//   };

//   updateOrder = (links) => {
//     links.forEach((link, index) => this.updateLink(link.id, { order: index }));
//   };

//   addNewLink = (link, links) => {
//     return this.linksCollection.add(link).then((doc) => {
//       this.updateOrder(links);
//       return doc;
//     });
//   };

//   deleteLink = (id) => {
//     return this.linksCollection.doc(id).delete();
//   };

