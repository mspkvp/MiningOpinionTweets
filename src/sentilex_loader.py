import csv
import os
import unicodedata

def remove_diacritic(input):
    # Accept a unicode string, and return a normal string (bytes in Python 3)
    # without any diacritical marks.
    return unicodedata.normalize('NFKD', input).encode('ASCII', 'ignore')


def load_sentilex(filepath):
    sentilex_file = open(filepath, 'r').read()
    sentilex_aslist = sentilex_file.split('\n')
    
    sentilex = dict()
    
    for row in sentilex_aslist:
        row_split = row.split(';')
        main_words_dirty = row_split[0].split('.',1)[0]
        word, canonical_word = main_words_dirty.split(',')
        word = remove_diacritic(word.decode('utf-8'))
        canonical_word = remove_diacritic(canonical_word.decode('utf-8'))
        polarity = row_split[3].split('=',1)[1]
        
        if len(row_split) > 4 and row_split[4].split(':',1)[0] == 'POL': 
            if row_split[4].split('=',1)[1] != polarity:
                continue
        sentilex[word] = (canonical_word, polarity)
    
    return sentilex
    
    
def sentilex_analisys():
    
    sentilex = load_sentilex(os.getcwd() + "/sentiment/"+"SentiLex-flex-PT03.txt")
    
    entity_day_dict = dict()
    
    for i in os.listdir(os.getcwd() + "/filtered_tweets"):
            for filename in os.listdir(os.getcwd() + "/filtered_tweets" + "/" + i):
                 entity_day_dict[i+" "+filename] = open(os.getcwd() + "/filtered_tweets" + "/" + i + "/" + filename, 'r').read()
                
    for e_day, text in entity_day_dict.items():
        #dictionaries to store sentilex matches temporarily
        positiveHits = dict()
        negativeHits = dict()
        neutralHits = dict()
        
        #split text by space character
        text_split = text.split(' ')
        text_split = filter(None, text_split) #remove empty strings from the split process
        
        #sentilex dict match counter
        for word in text_split:
            #check word exists on sentilex
            if word in sentilex:
                #check word polarity
                if sentilex[word][1] == '1':
                    #canonical_word as key on these dictionaries - index 0
                    if sentilex[word][0] in positiveHits:
                        #word count
                        word_count = positiveHits[sentilex[word][0]][0] + 1
                        #check if array (with the original text words) contains this word
                        word_array = positiveHits[sentilex[word][0]][1]
                        if word not in word_array:
                            #add it
                            word_array.append(word)
                        
                        #save it
                        positiveHits[sentilex[word][0]] = (word_count, word_array)
                    else:
                        #create word instance in the dictionary
                        positiveHits[sentilex[word][0]] = (1, [word])
                elif sentilex[word][1] == '-1':
                    if sentilex[word][0] in negativeHits:
                        word_count = negativeHits[sentilex[word][0]][0] + 1
                        word_array = negativeHits[sentilex[word][0]][1]
                        if word not in word_array:
                            word_array.append(word)
                        
                        negativeHits[sentilex[word][0]] = (word_count, word_array)
                    else:
                        negativeHits[sentilex[word][0]] = (1, [word])
                elif sentilex[word][1] == '0':
                    if sentilex[word][0] in neutralHits:
                        word_count = neutralHits[sentilex[word][0]][0] + 1
                        word_array = neutralHits[sentilex[word][0]][1]
                        if word not in word_array:
                            word_array.append(word)
                        
                        neutralHits[sentilex[word][0]] = (word_count, word_array)
                    else:
                        neutralHits[sentilex[word][0]] = (1, [word])
        
        #write polarities in files
        entity_date = e_day.split(' ')[0]
        entity_name = e_day.split(' ')[1].split('.',1)[0]
        positive_file = csv.writer(open(os.getcwd() + '/sentiment/'+'newPositives'+'_'+entity_name+'_'+entity_date+'.csv', 'wb'))
        negative_file = csv.writer(open(os.getcwd() + '/sentiment/'+'newNegatives'+'_'+entity_name+'_'+entity_date+'.csv', 'wb'))
        neutral_file = csv.writer(open(os.getcwd() + '/sentiment/'+'newNeutrals'+'_'+entity_name+'_'+entity_date+'.csv', 'wb'))
        
        for word, tup in positiveHits.items():
            to_write = [word, tup[0]]
            to_write.extend(tup[1])
            positive_file.writerow(to_write)
            
        for word, tup in negativeHits.items():
            to_write = [word, tup[0]]
            to_write.extend(tup[1])
            negative_file.writerow(to_write)
            
        for word, tup in neutralHits.items():
            to_write = [word, tup[0]]
            to_write.extend(tup[1])
            neutral_file.writerow(to_write)
    return

sentilex_analisys()