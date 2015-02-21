function WordGenerator(minWordLength, maxWordLength, wordChain) {
	this.minWordLength = minWordLength;
	this.maxWordLength = maxWordLength;
	this.wordChain = wordChain;
}

WordGenerator.prototype.generateWord = function () {
	return this.wordChain.generateWord(this.minWordLength, this.maxWordLength, false);
};

WordGenerator.prototype.generateWords = function (count) {
	var generatedWords = [];
	for (var i = 0; i < count; i++) {
		try {
			var generatedWord = this.wordChain.generateWord(this.minWordLength, this.maxWordLength, false);
			generatedWords.push(generatedWord);
		} catch (e) {
			// generateWord failed
		}
	}
	return generatedWords;
};

module.exports = WordGenerator;
