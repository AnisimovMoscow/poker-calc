$(function() {
    // Выбор позиции
    $('div.position button').click(function() {
        if (!$(this).hasClass('active')) {
            $(this).parent().find('button.active').removeClass('active');
            $(this).addClass('active');
            
            var position = $(this).data('val');
            $(this).parent().data('val', position);
            
            $('input[name="known"]').val(position * 5);
            $('input[name="remain_outs"]').val('');
            $('input[name="needed_outs"]').val('');
            $('input[name="views"]').val('');
            $('div.result').hide();
            $('div.progress').hide();
        }
    });
    
    // Известные карты
    $('div.known button').click(function() {
        var $input = $('input[name="known"]');
        $input.val(parseInt($input.val()) + $(this).data('val'));
        
        if ($(this).data('val') == 3) {
            $input = $('input[name="views"]');
            $input.val(parseInt($input.val()) - 3);
        }
        
        update();
    });
    
    // Выбор комбинации
    $('div.combos a').click(function() {
        $('input[name="remain_outs"]').val($(this).data('val'));
        $('input[name="needed_outs"]').val(4);
        $('input[name="views"]').val(12);
        update();
        return false;
    });
    
    // Изменение аутов
    $('div.remain_outs button').click(function() {
        var $input = $('input[name="remain_outs"]');
        $input.val(parseInt($input.val()) + $(this).data('val'));
        update();
    });
    
    $('div.needed_outs button').click(function() {
        var $input = $('input[name="needed_outs"]');
        $input.val(parseInt($input.val()) + $(this).data('val'));
        update();
    });
    
    // Просмотры
    $('div.views button').click(function() {
        var $input = $('input[name="views"]');
        $input.val(parseInt($input.val()) + $(this).data('val'));
        update();
    });
    
    // Пересчет
    $('input[name="known"]').change(function() {
        update();
    });
    $('input[name="remain_outs"]').change(function() {
        update();
    });
    $('input[name="needed_outs"]').change(function() {
        update();
    });
    $('input[name="views"]').change(function() {
        update();
    });
});

// Расчёт
function update() {
    var unknown = 52 - $('input[name="known"]').val();
    var needed_outs = $('input[name="needed_outs"]').val();
    var remain_outs = $('input[name="remain_outs"]').val();
    var views = $('input[name="views"]').val();
    
    var total_combin = combin(unknown, views);
    
    var unsuccess = 0;
    for (outs=0; outs<needed_outs; outs++) {
        if (outs <= remain_outs && outs <= views) {
            unsuccess += combin(remain_outs, outs)*combin(unknown-remain_outs, views-outs);
        }
    }
    
    var result = Math.round(100*(total_combin - unsuccess)/total_combin);
    
    $('div.result').html(result+'%').show();
    $('div.progress div.bar').css('width', result+'%');
    $('div.progress').show();
}

// Факториал
function fact(n) {
    var fact = 1;
    for (var i=1; i<=n; i++) {
        fact *= i;
    }
    return fact;
}

// Биномиальный коэффициент
function combin(n, k) {
    return fact(n)/fact(k)/fact(n-k);
}