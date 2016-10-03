/**
 * This is implementation of Java's String.hashCode() method
 * http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
 */
export class JavaHashCodeHelper {
    
    static hash(str: string): number {
        let hash = 0;
        if (!str || str.length == 0) return hash;
        for (let i = 0; i < str.length; i++) {
            let char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
}