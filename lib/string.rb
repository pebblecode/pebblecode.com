# encoding: utf-8

String.class_eval do
  # Based on http://stackoverflow.com/q/2660470/111884
  def to_slug
    value = self.downcase
    accents = {
      ['á','à','â','ä','ã'] => 'a',
      ['Ã','Ä','Â','À'] => 'A',
      ['é','è','ê','ë'] => 'e',
      ['Ë','É','È','Ê'] => 'E',
      ['í','ì','î','ï'] => 'i',
      ['Î','Ì'] => 'I',
      ['ó','ò','ô','ö','õ'] => 'o',
      ['Õ','Ö','Ô','Ò','Ó'] => 'O',
      ['ú','ù','û','ü'] => 'u',
      ['Ú','Û','Ù','Ü'] => 'U',
      ['ç'] => 'c', ['Ç'] => 'C',
      ['ñ'] => 'n', ['Ñ'] => 'N'
    }

    accents.each do |ac,rep|
      ac.each do |s|
        value.gsub!(s, rep)
      end
    end

    value.gsub!(/[^a-zA-Z0-9 ]/,"")
    value.gsub!(/[ ]+/," ")
    value.gsub!(/ /,"-")

    value
  end
end