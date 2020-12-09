import { firestore } from '../firebase/firebase';

const userDoc = (userId: any) => firestore.collection('users').doc(userId);
   

export const getAllLinks = async (userId?: string) => {
  const data = await userDoc(userId)
    .collection('links')
    .orderBy('order', 'asc')
    .get();
  const linksEntity = {} as any;
  data.docs.forEach((doc: any) => {
    linksEntity[doc.id] = { id: doc.id, ...doc.data() };
  });
  return linksEntity;
};

export const getExposedLinksByProfile = async (profile: string) => {
  const groupRef = firestore.collectionGroup('links').where('profile', '==', profile);
  const orderedGroup = groupRef.orderBy('order', 'asc');
  const group = await orderedGroup.get();
  const linksEntity = {} as any;
  group.docs.forEach((doc: any) => {
    linksEntity[doc.id] = { id: doc.id, ...doc.data() };
  });
  return linksEntity;
}

export const updateLink = async (userId: string, id: string, payload: any) => {
  return await userDoc(userId)
    .collection('links')
    .doc(id)
    .update(payload);
};

export const updateOrder = (userId: string, links: any) => {
  links.forEach((link: any, index: number) => updateLink(userId, link.id, { order: index }));
};

export const addNewLink = (userId: string, link: any) => {
  return userDoc(userId)
    .collection('links')
    .add(link)
    .then((doc:any) => {
      updateLink(userId, doc.id, { id: doc.id})
      return doc;
    });
};

export const deleteLink = (userId: string, id: string) => {
  return userDoc(userId)
    .collection('links')
    .doc(id)
    .delete();
};
